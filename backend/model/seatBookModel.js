// seatBookModel.js
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

// Create a model factory function instead of direct model creation
export const createBusBookingModel = (tripId) => {
  // Check if model already exists to prevent recreation
  if (mongoose.models[tripId]) {
    return mongoose.model(tripId);
  }
  
  // Create new model with dynamic collection name
  return mongoose.model(tripId, busBookingSchema);
};

// Default export for backwards compatibility
export default createBusBookingModel;