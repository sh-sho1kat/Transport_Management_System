import mongoose from "mongoose";

const busBookingSchema = new mongoose.Schema({
  seatNo: {
    type: String,
    required: true,
    trim: true,
  },
  bookingStatus: {
    type: String,
    enum: ["booked", "unbooked"],
    required: true,
    default: "unbooked",
  },
  studentId: {
    type: String,
    default: null,
  },
  studentMail: {
    type: String,
    default: null,
  },
  bookingDate: {
    type: Date,
    default: null,
  },
  bookingTime: {
    type: String,
    default: null,
  },
});

const BusBooking = mongoose.model("tripID", busBookingSchema);

export default BusBooking;