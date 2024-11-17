
const Owner = require('../../Models/Owner');

const addOwners = async (req, res) => {
    try {
        const owner = await Owner.findOne({ cnic: req.body.cnic });
        console.log('req.body', req.body)
        // If owner exists, return a response to the client
        if (owner) {
            return res.status(400).json({ message: "Owner already exists" });
        }

        // Convert the ownerName and familyName to lowercase if they exist
        if (req.body?.ownerName) {
            req.body.ownerName = req.body.ownerName.toLowerCase();
        }
        if (req.body?.familyName) {
            req.body.familyName = req.body.familyName.toLowerCase();
        }

        // Create a new owner with the updated data
        const newOwner = await Owner.create({
            userId: req.user.id,
            ...req.body
        });

        // Send a success response
        return res.status(201).json({ message: "Owner added successfully", data: newOwner });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getOwners = async (req, res) => {
    try {
        const owners = await Owner.find().populate("cnicFrontImage").populate('cnicBackImage').populate("profileImage");
        return res.status(200).json({ data: owners });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateOwner = async (req, res) => {
    const ownerId = req.params.id; // Owner ID from request parameters
    const updateData = { ...req.body }; // Clone request body to updateData

    delete updateData.cnic;

    try {
        const updatedOwner = await Owner.findByIdAndUpdate(
            ownerId,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedOwner) {
            return res.status(404).json({ message: 'Owner not found' });
        }

        res.status(200).json({
            message: 'Owner updated successfully',
            owner: updatedOwner
        });
    } catch (error) {
        console.error('Error updating owner:', error);
        res.status(500).json({
            message: 'Failed to update owner',
            error: error.message
        });
    }
};

module.exports = { addOwners, getOwners, updateOwner };
