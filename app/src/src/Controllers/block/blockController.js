const Block = require('../../Models/Block');
const Upload = require('../../Models/Upload');

const { validationResult } = require('express-validator');
const addblock = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 400,
                errors: errors.array(),
            });
        }

        // Check if a phase with the same name already exists
        const existingBlock = await Block.findOne({ block_name: req.body.block_name, phaseid: req.body.phaseid });
        if (existingBlock) {
            return res.status(400).json({
                status: 400,
                errors: `Block ${req.body.block_name} already exists`,
            });
        }

        // Create a new phase
        if (req.body.file) {
            await Upload.findByIdAndUpdate(req.body.file, { status: "USED" }, { new: true });
        }
        const newBLock = await Block.create({
            userid: req.user.id,
            ...req.body
        });

        // If the phase is created successfully, send a success response
        return res.status(200).json({
            status: 200,
            message: `${req.body.block_name} Created Successfully`,
            Block: {
                block_name: newBLock.block_name,
                block_location: newBLock.block_location,
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
const getblocks = async (req, res) => {
    try {
        const { query } = req.query;

        let filter = { show: true };

        // If there's a query, apply the search filter
        if (query) {
            filter = {
                show: true,
                $or: [
                    { block_name: { $regex: query, $options: 'i' } },
                ]
            };
        }

        const existingBlock = await Block.find(filter).populate('phaseid').populate('file');

        return res.status(200).json({
            status: 200,
            data: existingBlock,
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

const updateBlock = async (req, res) => {
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
        const { block_name } = req.body;
        const existingBlockWithNewName = await Block.findOne({ block_name, phaseid: req.body.phaseid });
        console.log('existingBlockWithNewName', existingBlockWithNewName)
        if (existingBlockWithNewName && existingBlockWithNewName._id.toString() !== id) {
            return res.status(400).json({
                status: 400,
                message: `Block ${block_name} already exists`,
            });
        }

        // Update the phase
        if (req.body.file && existingBlockWithNewName?.file?.toString() === req.body.file) {
            await Upload.findByIdAndUpdate(req.body.file, { status: "PENDING" }, { new: true });
        }
        const updatedBlock = await Block.findByIdAndUpdate(id, {
            block_name: req.body.block_name,
            block_location: req.body.block_location,
            file: req.body.file
        }, { new: true });

        if (!updatedBlock) {
            return res.status(404).json({
                status: 404,
                message: "BLock not found",
            });
        }

        return res.status(200).json({
            status: 200,
            message: `${block_name} Updated Successfully`,
            Phase: {
                phase_name: updatedBlock.block_name,
                phase_location: updatedBlock.block_location,
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
const deleteBlock = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the phase to delete
        const phaseToDelete = await Block.findById(id);
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
const getBlockByPhase = async (req, res) => {
    console.log('first', req.params)
    const { id } = req.params;
    try {
        const blocks = await Block.find({ phaseid: id });
        return res.status(200).json({
            status: 200,
            data: blocks,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Server Error",
            error: error.message,
        });
    }
}

module.exports = { addblock, getblocks, updateBlock, deleteBlock, getBlockByPhase };

