import Trip from "../model/tripModel.js";

// Controller to create a new trip entry
export const createTrip = async (req, res) => {
    try {
        const { busID, tripID, startlocation, destination, date, departuretime } = req.body;

        if (!busID || !startlocation || !destination || !date || !departuretime || !tripID) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newTrip = new Trip({
            busID,
            tripID,
            startlocation,
            destination,
            date,
            departuretime,
        });

        await newTrip.save();

        res.status(201).json({ message: "Trip entry created successfully", newTrip });
    } catch (error) {
        console.error("Error creating trip:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to get all trips
export const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find();
        res.status(200).json(trips);
    } catch (error) {
        console.error("Error fetching trips:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to get a single trip by ID
export const getTripById = async (req, res) => {
    try {
        const trip = await Trip.findById(req.params.id);
        
        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json(trip);
    } catch (error) {
        console.error("Error fetching trip:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to get trips by busID
export const getTripsByBusId = async (req, res) => {
    try {
        const trips = await Trip.find({ busID: req.params.busID });
        
        if (!trips.length) {
            return res.status(404).json({ message: "No trips found for this bus" });
        }

        res.status(200).json(trips);
    } catch (error) {
        console.error("Error fetching trips by bus ID:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to update a trip
export const updateTrip = async (req, res) => {
    try {
        const { busID, tripID, startlocation, destination, date, departuretime } = req.body;

        if (!busID || !startlocation || !destination || !date || !departuretime || !tripID) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const updatedTrip = await Trip.findByIdAndUpdate(
            req.params.id,
            {
                busID,
                tripID,
                startlocation,
                destination,
                date,
                departuretime
            },
            { new: true }
        );

        if (!updatedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json({ message: "Trip updated successfully", updatedTrip });
    } catch (error) {
        console.error("Error updating trip:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to delete a trip
export const deleteTrip = async (req, res) => {
    try {
        const deletedTrip = await Trip.findByIdAndDelete(req.params.id);

        if (!deletedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
        console.error("Error deleting trip:", error);
        res.status(500).json({ message: "Server error" });
    }
};