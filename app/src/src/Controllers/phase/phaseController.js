const Phase = require('../../Models/Phase');
const { validationResult } = require('express-validator');
const addPhase = async (req, res) => {
    try {
        // Validate the request body
        console.log('req.user', req.user)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: errors.array(),
            });
        }

        // Check if a phase with the same name already exists
        const existingPhase = await Phase.findOne({ phase_name: req.body.phase_name });
        if (existingPhase) {
            return res.status(400).json({
                status: 400,
                errors: `${req.body.phase_name} already exists`,
            });
        }

        // Create a new phase
        const newPhase = await Phase.create({
            userid: req.user.id,
            ...req.body
        });

        // If the phase is created successfully, send a success response
        return res.status(200).json({
            status: 200,
            message: `${req.body.phase_name} Created Successfully`,
            Phase: {
                phase_name: newPhase.phase_name,
                phase_location: newPhase.phase_location,
            }, // Select only the phase_name and phase_location fields
        });
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({
            status: 500,
            message: "Server Error",
            error: error.message,
        });
    }
};
const getPhases = async (req, res) => {
    try {
        const { query } = req.query;

        let filter = { show: true };

        // If there's a query, apply the search filter
        if (query) {
            filter = {
                show: true,
                $or: [
                    { phase_name: { $regex: query, $options: 'i' } },
                ]
            };
        }

        const existingPhases = await Phase.find(filter);

        return res.status(200).json({
            status: 200,
            data: existingPhases,
        });
    } catch (error) {
        // Handle any errors that occur during the process
        return res.status(500).json({
            status: 500,
            message: "Server Error",
            error: error.message,
        });
    }
};

const updatePhase = async (req, res) => {
    try {
        // Validate the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: errors.array(),
            });
        }

        const { id } = req.params;
        const { phase_name } = req.body;

        // Check if the phase with the new name already exists
        const existingPhaseWithNewName = await Phase.findOne({ phase_name });
        if (existingPhaseWithNewName && existingPhaseWithNewName._id.toString() !== id) {
            return res.status(400).json({
                status: 400,
                message: `${phase_name} already exists`,
            });
        }

        // Update the phase
        const updatedPhase = await Phase.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedPhase) {
            return res.status(404).json({
                status: 404,
                message: "Phase not found",
            });
        }

        return res.status(200).json({
            status: 200,
            message: `${phase_name} Updated Successfully`,
            Phase: {
                phase_name: updatedPhase.phase_name,
                phase_location: updatedPhase.phase_location,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
            error: error.message,
        });
    }
};
const deletePhase = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the phase to delete
        const phaseToDelete = await Phase.findById(id);
        if (!phaseToDelete) {
            return res.status(404).json({
                status: 404,
                message: "Phase not found",
            });
        }

        // Delete the phase
        await Phase.findByIdAndDelete(id);

        return res.status(200).json({
            status: 200,
            message: "Phase Deleted Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
            error: error.message,
        });
    }
};

const searchPhaes = async (req, res) => {
    const { query } = req.query;
    try {
        const phases = await Phase.find({
            $or: [
                { phase_name: { $regex: query, $options: 'i' } },
            ]
        });
        return res.status(200).json({
            status: 200,
            data: phases,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error searching for phases' });
    }
};

module.exports = { addPhase, getPhases, updatePhase, deletePhase };

