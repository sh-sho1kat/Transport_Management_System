// routes/bookingRoutes.js
import express from 'express';
import EmailPdfService from '../controller/EmailPdfService';

const router = express.Router();

router.post('/confirm-booking', async (req, res) => {
  try {
    const bookingDetails = req.body;
    await EmailPdfService.sendBookingConfirmation(bookingDetails);
    res.json({ success: true, message: 'Booking confirmation sent successfully' });
  } catch (error) {
    console.error('Error processing booking confirmation:', error);
    res.status(500).json({ success: false, message: 'Failed to process booking confirmation' });
  }
});

export default router;