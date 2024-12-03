import express from "express";
import {
    createSeats,
    getAllSeats,
    getSeatByNumber,
    getBookedSeats,
    getBookingsByStudent,
    updateSeatStatus,
    updateMultipleSeats
} from "../controller/seatBookController.js";

const router = express.Router();

// Create initial seats
router.post("/seats/create", createSeats);
// Get all seats
router.get("/seats", getAllSeats);
// Get all booked seats
router.get("/seats/booked", getBookedSeats);
// Get bookings by student ID
router.get("/seats/student/:studentId", getBookingsByStudent);
// Get specific seat
router.get("/seats/:seatNo", getSeatByNumber);
// Update single seat
router.put("/seats/:seatNo", updateSeatStatus);
// Update multiple seats
router.put("/seats", updateMultipleSeats);

export default router;