const ChargeType = require("../../Models/chargeType");
const dayjs = require('dayjs'); // Importing Day.js

// Add a new charge type
const addChargeType = async (req, res) => {
    try {
        const id = req.user.id; // Get user ID from the request (assuming you use authentication middleware)
        const { chargeName } = req.body; // Get charge name from the request body

        // Create new charge type
        const newChargeType = new ChargeType({
            userid: id,
            chargeName: chargeName,
        });

        // Save charge type to the database
        await newChargeType.save();

        res.status(201).json({ message: 'Charge type added successfully', chargeType: newChargeType });
    } catch (error) {
        console.error("Error adding charge type:", error);
        res.status(500).json({ message: 'Error adding charge type', error });
    }
};

// Get all charge types for the authenticated user
const getChargeTypes = async (req, res) => {
    try {
        const id = req.user.id; // Get user ID from the request

        // Find all charge types for the user
        const chargeTypes = await ChargeType.find({ userid: id });

        if (!chargeTypes.length) {
            return res.status(404).json({ message: 'No charge types found' });
        }

        res.status(200).json({ chargeTypes });
    } catch (error) {
        console.error("Error getting charge types:", error);
        res.status(500).json({ message: 'Error getting charge types', error });
    }
};

module.exports = { addChargeType, getChargeTypes };
