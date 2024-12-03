import Timetable from "../model/timeModel.js"

// Controller to create a new time entry
export const createTime = async (req, res) => {
    try {
        const { time } = req.body;

        if (!time) {
            return res.status(400).json({ message: "Time is required" });
        }

        const newTime = new Timetable({
            time,
        });

        await newTime.save();

        res.status(201).json({ message: "Time entry created successfully", newTime });
    } catch (error) {
        console.error("Error creating time:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to get all time entries
export const getAllTimes = async (req, res) => {
    try {
        const times = await Timetable.find();
        res.status(200).json(times);
    } catch (error) {
        console.error("Error fetching times:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to get a single time entry by ID
export const getTimeById = async (req, res) => {
    try {
        const timeEntry = await Timetable.findById(req.params.id);
        
        if (!timeEntry) {
            return res.status(404).json({ message: "Time entry not found" });
        }

        res.status(200).json(timeEntry);
    } catch (error) {
        console.error("Error fetching time:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to update a time entry
export const updateTime = async (req, res) => {
    try {
        const { time } = req.body;

        if (!time) {
            return res.status(400).json({ message: "Time is required" });
        }

        const updatedTime = await Timetable.findByIdAndUpdate(
            req.params.id,
            { time },
            { new: true } // Returns the updated document
        );

        if (!updatedTime) {
            return res.status(404).json({ message: "Time entry not found" });
        }

        res.status(200).json({ message: "Time entry updated successfully", updatedTime });
    } catch (error) {
        console.error("Error updating time:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to delete a time entry
export const deleteTime = async (req, res) => {
    try {
        const deletedTime = await Timetable.findByIdAndDelete(req.params.id);

        if (!deletedTime) {
            return res.status(404).json({ message: "Time entry not found" });
        }

        res.status(200).json({ message: "Time entry deleted successfully" });
    } catch (error) {
        console.error("Error deleting time:", error);
        res.status(500).json({ message: "Server error" });
    }
};