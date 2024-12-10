// seatBookRoute.js
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

// Updated routes with tripId parameter
router.post("/seats/create/:tripId", createSeats);
router.get("/seats/:tripId", getAllSeats);
router.get("/seats/:tripId/booked", getBookedSeats);
router.get("/seats/:tripId/student/:studentId", getBookingsByStudent);
router.get("/seats/:tripId/:seatNo", getSeatByNumber);
router.put("/seats/:tripId/:seatNo", updateSeatStatus);
router.put("/seats/:tripId", updateMultipleSeats);

export default router;