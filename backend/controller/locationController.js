import Location from "../model/locationModel.js"

// Controller to create a new location
export const createLocation = async (req, res) => {
    try {
        const { location } = req.body;

        if (!location) {
            return res.status(400).json({ message: "Location is required" });
        }

        const newLocation = new Location({
            location,
        });

        await newLocation.save();

        res.status(201).json({ message: "Location created successfully", newLocation });
    } catch (error) {
        console.error("Error creating location:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to get all locations
export const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.find();
        res.status(200).json(locations);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to get a single location by ID
export const getLocationById = async (req, res) => {
    try {
        const locationEntry = await Location.findById(req.params.id);
        
        if (!locationEntry) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json(locationEntry);
    } catch (error) {
        console.error("Error fetching location:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to update a location
export const updateLocation = async (req, res) => {
    try {
        const { location } = req.body;

        if (!location) {
            return res.status(400).json({ message: "Location is required" });
        }

        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.id,
            { location },
            { new: true }
        );

        if (!updatedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json({ message: "Location updated successfully", updatedLocation });
    } catch (error) {
        console.error("Error updating location:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Controller to delete a location
export const deleteLocation = async (req, res) => {
    try {
        const deletedLocation = await Location.findByIdAndDelete(req.params.id);

        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }

        res.status(200).json({ message: "Location deleted successfully" });
    } catch (error) {
        console.error("Error deleting location:", error);
        res.status(500).json({ message: "Server error" });
    }
};