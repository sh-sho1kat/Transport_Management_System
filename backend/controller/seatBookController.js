import mongoose from "mongoose";
import BusBooking from '../model/seatBookModel.js';

/**
 * Create a table with 40 seats.
 */
export const createSeats = async (req, res) => {
  try {
    // Clear existing seats (optional)
    await BusBooking.deleteMany();

    // Generate 40 seats
    const seats = [];
    for (let i = 1; i <= 40; i++) {
      seats.push({
        seatNo: `${i.toString().padStart(2, "0")}`,
        bookingStatus: "unbooked",
        studentId: null,
        studentMail: null,
        bookingDate: null,
        bookingTime: null
      });
    }

    await BusBooking.insertMany(seats);

    res.status(201).json({ message: "seats created successfully!" });
  } catch (error) {
    console.error("Error creating seats:", error);
    res.status(500).json({ error: "Failed to create seats." });
  }
};

/**
 * Get all seats with their booking status
 */
export const getAllSeats = async (req, res) => {
  try {
    const seats = await BusBooking.find().sort({ seatNo: 1 });
    res.status(200).json(seats);
  } catch (error) {
    console.error("Error fetching seats:", error);
    res.status(500).json({ error: "Failed to fetch seats." });
  }
};

/**
 * Get a specific seat by seat number
 */
export const getSeatByNumber = async (req, res) => {
  try {
    const { seatNo } = req.params;
    const seat = await BusBooking.findOne({ seatNo });

    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    res.status(200).json(seat);
  } catch (error) {
    console.error("Error fetching seat:", error);
    res.status(500).json({ error: "Failed to fetch seat." });
  }
};

/**
 * Get all booked seats
 */
export const getBookedSeats = async (req, res) => {
  try {
    const bookedSeats = await BusBooking.find({ bookingStatus: "booked" }).sort({ seatNo: 1 });
    res.status(200).json(bookedSeats);
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    res.status(500).json({ error: "Failed to fetch booked seats." });
  }
};

/**
 * Get bookings by student ID
 */
export const getBookingsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const bookings = await BusBooking.find({ studentId }).sort({ seatNo: 1 });
    
    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this student" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching student bookings:", error);
    res.status(500).json({ error: "Failed to fetch student bookings." });
  }
};

/**
 * Update seat booking status
 */
export const updateSeatStatus = async (req, res) => {
  try {
    const { seatNo } = req.params;
    const { bookingStatus, studentId, studentMail } = req.body;

    if (!bookingStatus) {
      return res.status(400).json({ message: "Booking status is required" });
    }

    // Additional validation for booked seats
    if (bookingStatus === "booked" && (!studentId || !studentMail)) {
      return res.status(400).json({ message: "Student details are required for booking" });
    }

    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();

    const updatedSeat = await BusBooking.findOneAndUpdate(
      { seatNo },
      {
        bookingStatus,
        ...(bookingStatus === "booked" && {
          studentId,
          studentMail,
          bookingDate: currentDate,
          bookingTime: currentTime
        }),
        ...(bookingStatus === "unbooked" && {
          studentId: null,
          studentMail: null,
          bookingDate: null,
          bookingTime: null
        })
      },
      { new: true }
    );

    if (!updatedSeat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    res.status(200).json({ message: "Seat updated successfully", seat: updatedSeat });
  } catch (error) {
    console.error("Error updating seat:", error);
    res.status(500).json({ error: "Failed to update seat." });
  }
};

/**
 * Update multiple seats at once
 */
export const updateMultipleSeats = async (req, res) => {
  try {
    const { seats } = req.body; // Array of seat updates

    if (!Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({ message: "Invalid seats data" });
    }

    const currentDate = new Date();
    const currentTime = currentDate.toLocaleTimeString();

    const updatePromises = seats.map(async (seatData) => {
      const { seatNo, bookingStatus, studentId, studentMail } = seatData;

      if (bookingStatus === "booked" && (!studentId || !studentMail)) {
        throw new Error(`Student details required for seat ${seatNo}`);
      }

      return BusBooking.findOneAndUpdate(
        { seatNo },
        {
          bookingStatus,
          ...(bookingStatus === "booked" && {
            studentId,
            studentMail,
            bookingDate: currentDate,
            bookingTime: currentTime
          }),
          ...(bookingStatus === "unbooked" && {
            studentId: null,
            studentMail: null,
            bookingDate: null,
            bookingTime: null
          })
        },
        { new: true }
      );
    });

    const updatedSeats = await Promise.all(updatePromises);
    res.status(200).json({ message: "Seats updated successfully", seats: updatedSeats });
  } catch (error) {
    console.error("Error updating seats:", error);
    res.status(500).json({ error: error.message || "Failed to update seats." });
  }
};