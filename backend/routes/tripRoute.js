import express from "express";
import { 
    createTrip, 
    getAllTrips, 
    getTripById,
    getTripsByBusId,
    updateTrip, 
    deleteTrip 
} from "../controller/tripController.js";

const router = express.Router();


router.post("/create-trip", createTrip);
router.get("/get-trip", getAllTrips);
router.get("/get-trip/:id", getTripById);
router.get("/get-trip/bus/:busID", getTripsByBusId);
router.put("/update-trip/:id", updateTrip);
router.delete("/delete-trip/:id", deleteTrip);

export default router;