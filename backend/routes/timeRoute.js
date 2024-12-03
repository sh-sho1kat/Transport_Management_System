import express from "express";
import { 
    createTime, 
    getAllTimes, 
    getTimeById, 
    updateTime, 
    deleteTime 
} from "../controller/timeController.js";

const router = express.Router();


router.post("/create-time", createTime);
router.get("/get-time", getAllTimes);
router.get("/get-time/:id", getTimeById);
router.put("/update-time/:id", updateTime);
router.delete("/delete-time/:id", deleteTime);

export default router;