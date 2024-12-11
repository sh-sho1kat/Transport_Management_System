import nodemailer from 'nodemailer';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

class EmailPdfService {
  constructor() {
    // Initialize nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: 'shefat.hossen.786@gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD 
      }
    });
  }

  async generateBookingPDF(bookingDetails) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument();
      const pdfPath = path.join(__dirname, `../temp/booking-${Date.now()}.pdf`);
      const writeStream = fs.createWriteStream(pdfPath);

      doc.pipe(writeStream);

      // Add university logo or header
      doc.fontSize(20).text('University Bus Booking Confirmation', { align: 'center' });
      doc.moveDown();

      // Add booking details
      doc.fontSize(12);
      doc.text(`Booking Reference: ${Date.now()}`);
      doc.text(`Student ID: ${bookingDetails.studentId}`);
      doc.text(`Email: ${bookingDetails.studentMail}`); // Use studentMail from booking details
      doc.moveDown();

      // Add seat information
      doc.text('Seat Details:');
      bookingDetails.seats.forEach(seat => {
        doc.text(`Seat Number: ${seat.seatNo}`);
      });
      doc.moveDown();

      // Add trip information
      doc.text(`Trip ID: ${bookingDetails.tripID}`);
      doc.text(`Booking Date: ${bookingDetails.bookingDate}`);
      doc.text(`Booking Time: ${bookingDetails.bookingTime}`);
      doc.moveDown();

      // Add terms and conditions
      doc.fontSize(10);
      doc.text('Terms and Conditions:', { underline: true });
      doc.text('1. Please arrive 10 minutes before departure time.');
      doc.text('2. Show this booking confirmation and your student ID to the bus driver.');
      doc.text('3. University ID card is mandatory while boarding.');

      doc.end();

      writeStream.on('finish', () => {
        resolve(pdfPath);
      });

      writeStream.on('error', reject);
    });
  }

  async sendBookingConfirmation(bookingDetails) {
    try {
      // Generate PDF
      const pdfPath = await this.generateBookingPDF(bookingDetails);

      // Send email with PDF attachment
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: bookingDetails.studentMail, // Use the email from the form
        subject: 'University Bus Booking Confirmation',
        html: `
          <h2>Bus Booking Confirmation</h2>
          <p>Dear Student (${bookingDetails.studentId}),</p>
          <p>Your bus booking has been confirmed. Please find the details below:</p>
          <ul>
            <li>Student ID: ${bookingDetails.studentId}</li>
            <li>Trip ID: ${bookingDetails.tripID}</li>
            <li>Seats: ${bookingDetails.seats.map(seat => seat.seatNo).join(', ')}</li>
            <li>Booking Date: ${bookingDetails.bookingDate}</li>
            <li>Booking Time: ${bookingDetails.bookingTime}</li>
          </ul>
          <p>Please find your booking confirmation PDF attached.</p>
          <p>Important Notes:</p>
          <ul>
            <li>Please arrive 10 minutes before departure time</li>
            <li>Carry your university ID card</li>
            <li>Show this confirmation to the bus driver</li>
          </ul>
          <p>Best regards,<br>University Transportation Department</p>
        `,
        attachments: [
          {
            filename: 'booking-confirmation.pdf',
            path: pdfPath,
            contentType: 'application/pdf'
          }
        ]
      };

      await this.transporter.sendMail(mailOptions);

      // Clean up: remove the temporary PDF file
      fs.unlink(pdfPath, (err) => {
        if (err) console.error('Error deleting temporary PDF:', err);
      });

      return { success: true };
    } catch (error) {
      console.error('Error sending booking confirmation:', error);
      throw error;
    }
  }
}

export default new EmailPdfService();