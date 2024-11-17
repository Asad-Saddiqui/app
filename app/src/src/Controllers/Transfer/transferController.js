const Charges = require("../../Models/Charges");
const Payments = require("../../Models/Payments");
const Membership = require("../../Models/Membership");
const Transfer = require("../../Models/Transfer");
const User = require("../../Models/User");
const { updateOwnerStatus } = require("../memberShip/membershipControllsers");


const TransferMemberShip = async (req, res) => {
    try {
        const { type } = req.body;
        const membership = await Membership.findById(req.body.membershipId);
        if (!membership) {
            return res.status(404).json({ message: "Membership not found" });
        }
        if (!["Open", "Draft",].includes(membership.status)) {
            return res.status(400).json({ message: "Cannot transfer a file that is in progress or closed" });
        }
        const seller = membership.owners.map(name => ({
            owner: name.owner,
            share: name.share
        }));
        const totalSellerShare = seller.reduce((acc, owner) => acc + parseFloat(owner.share), 0);
        const sellerNominees = membership.nominees;
        if (type === "Normal") {
            const totalPurchaserShare = req.body.purchasers.reduce((acc, purchaser) => acc + parseFloat(purchaser.share), 0);
            const redistributedShares = req.body.purchasers.map(purchaser => {
                const purchaserShare = Math.round(((purchaser.share / 100) * totalSellerShare));
                return { ...purchaser, share: purchaserShare };
            });
            if (totalPurchaserShare !== 100) {
                return res.status(400).json({ message: "Total share of purchasers must equal 100%" });
            }
            membership.transferCount = membership.transferCount ? membership.transferCount + 1 : 1
            let count = membership.plotNo + "-" + "ICHS" + "-T-" + membership.transferCount
            membership.transferNo = count;
            membership.status = "Pending";
            const transfer = await Transfer.create({
                sellerName: seller,
                purchasers: redistributedShares,
                purchaserWitness: req.body.purchaserWitness,
                sellerWitness: req.body.sellerWitness,
                fileId: req.body.membershipId,
                image: req.body.image,
                image1: req.body.image1,
                tNo: membership.transferCount,
                status: "Submitted to Manager"
            });
            await transfer.save();
            await membership.save()
        } else {
            membership.transferCount = membership.transferCount ? membership.transferCount + 1 : 1
            let count = membership.plotNo + "-" + "ICHS" + "-T-" + membership.transferCount
            membership.transferNo = count;
            membership.status = "Open File";
            const transfer = await Transfer.create({
                sellerName: seller,
                sellerWitness: req.body.sellerWitness,
                fileId: req.body.membershipId,
                image: req.body.image,
                tNo: membership.transferCount,
                status: "Open File",
                agent: req.body.agent,
            });
            await transfer.save();
            await membership.save()
        }
        return res.status(200).json({ message: "Membership Processing successfully", membership });
    } catch (error) {
        console.error('Error during membership transfer:', error);
        return res.status(500).json({ message: "An error occurred during the transfer process", error });
    }
};


const updateTransfer = async (req, res) => {
    try {

        const membership = await Membership.findById(req.body.membershipId);
        if (!membership) {
            return res.status(404).json({ message: "Membership not found" });
        }

        if (membership.status !== "Open File") {
            return res.status(400).json({ message: "Cannot transfer, as the file is not in 'Open File' status" });
        }

        // Find the transfer document based on transfer number and file ID
        const transfer = await Transfer.findOne({
            tNo: membership.transferCount.toString(),
            fileId: membership._id
        });

        // If transfer is not found, return a 404 error
        if (!transfer) {
            return res.status(404).json({ message: "Transfer not found" });
        }

        // Update the fields with data from the request body
        transfer.purchasers = req.body.purchasers;
        transfer.purchaserWitness = req.body.purchaserWitness;
        transfer.image1 = req.body.image1;
        transfer.status = "Submitted to Manager",
            membership.status = "Pending"
        await membership.save()
        await transfer.save();

        // Respond with the updated transfer
        return res.status(200).json({
            message: "Transfer updated successfully",
        });
    } catch (error) {
        console.error("Error updating transfer:", error);
        return res.status(500).json({ message: "An error occurred while updating the transfer" });
    }
};




const TrackTransfer = async (req, res) => {
    const { status, membershipId } = req.body;
    if (!membershipId || !status) {
        return res.status(400).json({ message: 'Membership ID and status are required.' });
    }

    try {
        const membership = await Membership.findOne({ _id: membershipId });
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found.' });
        }

        // Define role-based status options
        const adminStatuses = ['Under Final Review by Admin', 'Rejected by Admin', 'Transfer Completed', "Closed"];
        const managerStatuses = ['Under Review by Manager', 'Approved by Manager', 'Rejected by Manager'];
        let allowedStatuses = [];

        // Determine allowed statuses based on roles
        if (req.user.roles.includes('ADMIN')) allowedStatuses = adminStatuses;
        if (req.user.roles.includes('MANAGER')) allowedStatuses = [...allowedStatuses, ...managerStatuses];

        // Check if the input status is allowed based on the user's role
        if (!allowedStatuses.includes(status)) {
            return res.status(403).json({ message: 'Invalid Transfer Status.' });
        }

        const transfer = await Transfer.findOne({ tNo: parseInt(membership.transferCount), fileId: membershipId });
        if (!transfer) {
            return res.status(404).json({ message: 'Transfer not found.' });
        }
        if (transfer.status === "Open File") {
            return res.status(403).json({ message: 'You cannot change the status because the Purchaser is not  exist.' });
        }
        if (transfer.status === 'Transfer Completed') {
            return res.status(403).json({ message: 'You cannot change the status because the transfer is completed.' });
        }

        if (adminStatuses.includes(status)) {
            if (status === 'Rejected by Admin') {
                membership.status = 'Open';
                transfer.status = status;
                await membership.save();
                await transfer.save();
                return res.status(200).json({ message: 'File transfer rejected successfully.' });
            }
            if (status === 'Closed') {
                membership.status = 'Closed';
                transfer.status = status;
                await membership.save();
                await transfer.save();
                return res.status(200).json({ message: 'File transfer rejected successfully.' });
            }
            if (status === 'Transfer Completed') {
                const sellerNominee = membership.nominees.filter(nominee =>
                    transfer.sellerName.some(seller => seller.owner.toString() === nominee.owner.toString())
                );

                const remainingOwners = membership.owners.filter(owner =>
                    !transfer.sellerName.some(seller => seller.owner.toString() === owner.owner.toString())
                );

                const updatedOwners = remainingOwners.concat(transfer.purchasers).map(owner => ({
                    owner: owner.owner,
                    share: owner.share
                }));

                membership.owners = updatedOwners;
                membership.status = 'Open';
                transfer.status = status;
                transfer.sellerNominee = sellerNominee;

                await membership.save();
                await transfer.save();

                return res.status(200).json({ message: 'Transfer completed successfully.' });
            }
        }

        // Handle manager-level status changes
        if (managerStatuses.includes(status)) {
            // Prevent manager-level modifications if transfer is at admin level
            if (adminStatuses.includes(transfer.status)) {
                return res.status(403).json({ message: 'Control has shifted to the administrator, status change denied.' });
            }

            membership.status = 'Pending';
            transfer.status = status;

            await transfer.save();
        }

        // Save updated membership
        await membership.save();
        updateOwnerStatus();
        return res.status(200).json({ message: `Membership status updated to ${status} successfully.` });
    } catch (error) {
        console.error('Error updating membership:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};



const TrackTransferAdmin = async (req, res) => {
    try {
        // Find all transfer records and populate relevant fields
        let transfers = await Transfer.find()
            .populate('fileId') // Populate nominee details
            .populate('purchasers.owner') // Populate owner details
            .populate('sellerNominee.nominee') // Populate nominee details
            .populate('sellerName.owner') // Populate nominee owner details
            .populate('purchaserWitness') // Populate nominee owner details
            .sort({ createdAt: -1 })
        console.log('transfers', transfers)

        transfers = transfers.filter(dta => parseInt(dta.tNo) === parseInt(dta.fileId.transferCount))
        console.log('transfers', transfers)

        return res.status(200).json({
            message: 'Transfers fetched successfully!',
            data: transfers
        });
    } catch (error) {
        console.error('Error fetching transfers:', error);
        return res.status(500).json({ message: 'Error fetching transfers', error });
    }
};
const getTransferDataById = async (req, res) => {
    try {
        const { id, fileId } = req.params;
        console.log('tNo:', id, 'fileId:', fileId);
        const transfer = await Transfer.findOne({
            tNo: id,
            fileId: fileId
        }).populate({
            path: 'sellerName.owner',
            populate: [
                { path: 'profileImage' },
                { path: 'cnicBackImage' },
                { path: 'cnicFrontImage' }
            ]
        }).populate({
            path: 'purchasers.owner',
            populate: [
                { path: 'profileImage' },
                { path: 'cnicBackImage' },
                { path: 'cnicFrontImage' }
            ]
        }).populate('fileId').populate({
            path: 'sellerWitness',
            populate: [
                { path: 'profileImage' },
                { path: 'cnicBackImage' },
                { path: 'cnicFrontImage' }
            ]
        }).populate('fileId').populate({
            path: 'purchaserWitness',
            populate: [
                { path: 'profileImage' },
                { path: 'cnicBackImage' },
                { path: 'cnicFrontImage' }
            ]
        }).populate('image').populate('image1')

        if (!transfer) {
            return res.status(404).json({ message: "Transfer data not found" });
        }

        res.status(200).json({ transfer });
    } catch (error) {
        console.error('Error fetching transfer data:', error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};




const search_membership_track = async (req, res) => {
    try {
        const searchTerm = req.body.searchTerm || req.query.searchTerm; // Get the search term from the request
        if (!searchTerm) {
            return res.status(400).json({ message: "Search term is required." });
        }

        // Find documents that match the search term in name or email
        const results = await Membership.find({
            $or: [
                { newMembershipId: { $regex: searchTerm, $options: "i" } }, // Case-insensitive search in `name`
            ]
        }).sort({ createdAt: -1 })
            .limit(1).populate('block').populate("phase").populate('owners.owner');
        if (results.length > 0) {
            return res.status(200).json(results[0]); // Return the latest found document
        } else {
            return res.status(404).json({ message: "No matching record found." }); // No match found
        }
    } catch (error) {
        console.error("Error fetching results:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


module.exports = { TransferMemberShip, TrackTransfer, TrackTransferAdmin, getTransferDataById, search_membership_track, updateTransfer };
