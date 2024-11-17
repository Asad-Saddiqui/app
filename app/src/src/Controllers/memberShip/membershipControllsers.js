const Membership = require("../../Models/Membership");
const Owner = require("../../Models/Owner");
const Block = require("../../Models/Block");
const ChargeType = require("../../Models/chargeType");
const Charges = require("../../Models/Charges");
const Payments = require("../../Models/Payments");
const Count = require("../../Models/Count");

const { default: mongoose } = require("mongoose");
const addMemberShip = async (req, res) => {
    const userid = req.user.id;
    let count = await Count.findOne().sort({ createdAt: 1 })
    if (!count) {
        count = await Count.create({
        })
        await count.save()
    }
    try {
        const features = Object.keys(req.body).filter(key => {
            return req.body[key] === true;
        });
        const newMembershipData = {
            newMembershipId: "ICHS-" + (count?.Mid ? count?.Mid : 1),
            oldMembershipId: req.body.oldMembershipId,
            userId: userid, // Assign userId from the authenticated user
            phase: req.body.phase,
            plotNo: req.body.plotNo,
            D1: req.body.D1,
            D2: req.body.D2,
            block: req.body.block,
            purpose: req.body.purpose,
            property: req.body.property,
            propertyType: req.body.propertyType,
            status: "Draft",
            landSize: req.body.landSize,
            landUnit: req.body.landUnit,
            cost: req.body.cost,
            discountpkr: req.body.discountpkr,
            discountPer: req.body.discountPer,
            country: req.body.country,
            province: req.body.province,
            city: req.body.city,
            locationUrl: req.body.locationUrl,
            address: req.body.address,
            owners: req.body.owners,
            nominees: req.body.nominees,
            notes: req.body.notes,
            features: features
        };

        let FindPLot = await Membership.findOne({ phase: newMembershipData.phase, block: newMembershipData.block, plotNo: newMembershipData.plotNo })

        if (FindPLot) {
            return res.status(500).json({ message: 'File Already Exist' });
        }
        const newMembership = new Membership(newMembershipData);
        await newMembership.save();
        count.Mid = count.Mid ? count.Mid + 1 : 1
        await count.save();
        return res.status(201).json({ message: 'Membership created successfully!', data: newMembership });
    } catch (error) {
        console.error('Error saving membership:', error);
        return res.status(500).json({ message: 'Error saving membership', error });
    }
};
const fetchAllMemberships = async (req, res) => {
    try {
        const memberships = await Membership.find()
            .populate({
                path: 'userId', // Populating user details
                select: 'username' // Selecting only id and username from the User model
            })
            .populate({
                path: 'phase', // Populating phase details
                select: 'phase_name' // Selecting only id and name from the Phase model
            })
            .populate({
                path: 'block', // Populating block details
                select: 'block_name' // Selecting only id and name from the Block model
            })
            .populate('owners.owner') // Populate owner details
            .populate('nominees.nominee') // Populate nominee details
            .populate('nominees.owner')
        console.log('memberships', memberships)
        return res.status(200).json({ message: 'Memberships fetched successfully!', data: memberships });
    } catch (error) {
        console.error('Error fetching memberships:', error);
        return res.status(500).json({ message: 'Error fetching memberships', error });
    }
};
const fetchMembershipByid = async (req, res) => {
    try {
        const memberships = await Membership.findById({ _id: req.params.id })
            .populate({
                path: 'userId', // Populating user details
                select: 'username' // Selecting only id and username from the User model
            })
            .populate({
                path: 'phase', // Populating phase details
                select: 'phase_name' // Selecting only id and name from the Phase model
            })
            .populate({
                path: 'block', // Populating block details
                select: 'block_name' // Selecting only id and name from the Block model
            })
            .populate('owners.owner') // Populate owner details
            .populate('nominees.nominee') // Populate nominee details
            .populate('nominees.owner'); // Populate nominee owner details

        return res.status(200).json({ message: 'Memberships fetched successfully!', data: memberships });
    } catch (error) {
        console.error('Error fetching memberships:', error);
        return res.status(500).json({ message: 'Error fetching memberships', error });
    }
}
function validateData({ phase, data }) {
    const errors = [];

    // Check if data is valid and in the correct format
    if (!Array.isArray(data)) {
        return [{
            type: 'field',
            msg: 'Data must be an array',
            path: 'data',
            location: 'body'
        }];
    }

    // Validate Phase
    if (!phase) {
        return [{
            type: 'field',
            msg: 'Phase Id is required',
            path: 'phase',
            location: 'body'
        }];
    }

    for (let index = 0; index < data.length; index++) {
        const entry = data[index];

        // Validate S. No.
        if (typeof entry['S. No.'] !== 'number') {
            return [{
                type: 'field',
                msg: 'S. No. must be a number',
                path: `data[${index}].S. No.`,
                location: 'body'
            }];
        }

        // Validate Allocation of Plot
        const allocation = entry['Allocation of Plot'] || {};
        if (!allocation['plot no.']) {
            return [{
                type: 'field',
                msg: 'Plot no. is required',
                path: `data[${index}].Allocation of Plot.plot no.`,
                location: 'body'
            }];
        }
        // if (!allocation['street no.']) {
        //     return [{
        //         type: 'field',
        //         msg: 'Street no. must be a number',
        //         path: `data[${index}].Allocation of Plot.street no.`,
        //         location: 'body'
        //     }];
        // }
        if (!allocation['block no.']) {
            return [{
                type: 'field',
                msg: 'Block no. is required',
                path: `data[${index}].Allocation of Plot.block no.`,
                location: 'body'
            }];
        }

        // Validate Allottee / Purchaser
        const purchaser = entry['Allottee / Purchaser'] || {};
        if (!purchaser['m. s. no.']) {
            return [{
                type: 'field',
                msg: 'M. S. No. is required',
                path: `data[${index}].Allottee / Purchaser.m. s. no.`,
                location: 'body'
            }];
        }
        if (!purchaser.cnic) {
            return [{
                type: 'field',
                msg: 'CNIC must be 13 digits long',
                path: `data[${index}].Allottee / Purchaser.cnic`,
                location: 'body'
            }];
        }

        console.log('data', data)

        // if (!purchaser['contact no.']) {
        //     return [{
        //         type: 'field',
        //         msg: 'Contact no. is required',
        //         path: `data[${index}].Allottee / Purchaser.contact no.`,
        //         location: 'body'
        //     }];
        // }

        // Validate Cost of Plot
        const cost = entry['Cost of Plot'] || {};
        for (const [key, value] of Object.entries(cost)) {
            if (typeof value !== 'number') {
                return [{
                    type: 'field',
                    msg: `${key} must be a number`,
                    path: `data[${index}].Cost of Plot.${key}`,
                    location: 'body'
                }];
            }
        }

        // Validate Total Dues / Outstanding
        if (typeof entry['Total Dues / Outstanding'] !== 'number') {
            return [{
                type: 'field',
                msg: 'Total Dues / Outstanding must be a number',
                path: `data[${index}].Total Dues / Outstanding`,
                location: 'body'
            }];
        }
    }

    // If no errors, return null
    return null;
}
const importMembership = async (req, res) => {
    try {
        const { phase, data } = req.body;
        const validationErrors = validateData(req.body);
        if (validationErrors) {
            return res.status(500).json({ errors: validationErrors });
        }
        let count = await Count.findOne().sort({ createdAt: 1 })
        if (!count) {
            count = await Count.create({
            })
            await count.save()
        }
        const Owners = data.map((dta) => {
            return {
                ownerName: dta['Allottee / Purchaser'].name.replace("\r\n", ""),
                familyName: dta['Allottee / Purchaser']["father's/ husband name"],
                permanentAddress: dta['Allottee / Purchaser'].address.replace(`\r\n`, ""),
                cnic: dta['Allottee / Purchaser'].cnic,
                phoneNumber: dta['Allottee / Purchaser']["contact no."]
            };
        });

        const savedOwners = [];
        for (const owner of Owners) {
            let existingOwner = await Owner.findOne({ cnic: owner.cnic });
            if (existingOwner) {
                savedOwners.push(existingOwner);
            } else {
                const newOwner = new Owner(owner);
                const savedOwner = await newOwner.save();
                savedOwners.push(savedOwner);
            }
        }

        let membership = data.map((dta) => {
            return {
                oldMembershipId: dta['Allottee / Purchaser']['m. s. no.'],
                newMembershipId: "",
                phase: phase,
                block: dta['Allocation of Plot']['block no.'],
                landSize: dta['Size of Plot'],
                cost: 0,
                plotNo: dta['Allocation of Plot']['plot no.'],
                address: dta['Allocation of Plot']['street no.'],
                owners: [
                    savedOwners.find(dta_ => dta_.cnic === dta['Allottee / Purchaser']['cnic'])
                        ? { owner: savedOwners.find(dta_ => dta_.cnic === dta['Allottee / Purchaser']['cnic'])._id, share: 100 }
                        : null
                ].filter(owner => owner !== null)
            };
        });

        let block = new Set(membership.map(dta => dta.block));
        const newBlock = [];

        for (const element of Array.from(block)) {
            const _ExistBlock = await Block.findOne({ phaseid: phase, block_name: element });
            if (_ExistBlock) {
                newBlock.push(_ExistBlock);
            } else {
                const _newBlock = await Block.create({
                    block_name: element,
                    phaseid: phase,
                    userid: req.user.id
                });
                const cruntblock = await _newBlock.save();
                newBlock.push(cruntblock);
            }
        }

        membership = membership.map((dta) => {
            return {
                ...dta,
                block: newBlock.find(dta_ => dta_.block_name === dta.block)?._id
            };
        });

        membership.forEach((item) => {
            const [size, ...unitParts] = item.landSize.split(' ');
            item.landSize = parseInt(size);
            item.landUnit = unitParts.join(' ');
            item.userId = req.user.id;
        });

        let savedMemberShip = [];
        for (const file of membership) {
            try {
                const isExist = await Membership.findOne({
                    $or: [
                        { oldMembershipId: file.oldMembershipId, phase: file.phase, block: file.block },
                        { plotNo: file.plotNo, phase: file.phase, block: file.block }
                    ]
                });
                if (isExist) {
                    savedMemberShip.push(isExist);
                } else {
                    const latestMembership = await Membership.findOne().sort({ fileCount: -1 }).limit(1);
                    console.log('latestMembership?.fileCount', latestMembership?.fileCount ?? 0); // Using nullish coalescing for clarity
                    let counts = (latestMembership?.fileCount ?? 0) + 1; // Nullish coalescing to avoid undefined
                    file.newMembershipId = "ICHS-" + count?.Mid;
                    file.fileCount = counts;
                    const newFile = await Membership.create(file); // This automatically saves it
                    savedMemberShip.push(newFile);
                    count.Mid = count.Mid ? count.Mid + 1 : 1
                    await count.save();
                }
            } catch (error) {
                console.error("Error processing membership:", error);
            }
        }

        let chargesType_ = new Set(Object.keys(data?.[0]?.["Cost of Plot"]));
        const calculatePaymentDetails = (cost, payment) => {
            let amount = parseInt(cost);
            const balance = (typeof amount === 'number' ? amount : 0) - payment;
            return {
                amount: isNaN(amount) ? 0 : amount,
                balance: isNaN(balance) ? 0 : balance,
                downpayment: isNaN(payment) ? 0 : payment
            };
        };

        const updatedData = data.map(entry => {
            return {
                membershipId: entry['Allottee / Purchaser']['m. s. no.'],
                membership: calculatePaymentDetails(entry['Cost of Plot']['memberhsip fee'], entry['Payments of Plot']['memberhsip fee']),
                shareMoney: calculatePaymentDetails(entry['Cost of Plot']['share money'], entry['Payments of Plot']['share money']),
                costOfLandBooking: calculatePaymentDetails(entry['Cost of Plot']['cost of land / booking'], entry['Payments of Plot']['cost of land / booking']),
                cornerCharges: calculatePaymentDetails(entry['Cost of Plot']['coner / main road / park facing / service road charges'], entry['Payments of Plot']['coner / main road / park facing / service road charges']),
                developmentCharges: calculatePaymentDetails(entry['Cost of Plot']['development charges / installments'], entry['Payments of Plot']['development charges / installments']),
                electricityCharges: calculatePaymentDetails(entry['Cost of Plot']['electricty / sui gass charges'], entry['Payments of Plot']['electricty / sui gass charges']),
            };
        });

        chargesType_ = Array.from(chargesType_);
        let savedCharges = await Promise.all(chargesType_.map(async (chargeName) => {
            let chargesExist = await ChargeType.findOne({ chargeName });
            return chargesExist || await ChargeType.create({ userid: req.user.id, chargeName });
        }));

        const chargeMap = {
            "memberhsip fee": "membership",
            "share money": "shareMoney",
            "cost of land / booking": "costOfLandBooking",
            "coner / main road / park facing / service road charges": "cornerCharges",
            "development charges / installments": "developmentCharges",
            "electricty / sui gass charges": "electricityCharges"
        };

        savedCharges.forEach(charge => {
            const chargeKey = chargeMap[charge.chargeName];
            if (chargeKey) {
                updatedData.forEach(entry => {
                    if (entry[chargeKey]) entry[chargeKey].chargeName = charge.chargeName;
                });
            }
        });

        const updatedDataWithIds = updatedData.map(data => {
            const matchingSavedItem = savedMemberShip.find(savedItem => savedItem.oldMembershipId === data.membershipId);
            return matchingSavedItem ? { ...data, membershipId: matchingSavedItem._id } : data;
        });

        const updatedCharges = updatedDataWithIds.map(dta => ({
            membership: { ...dta.membership, membershipId: dta.membershipId, userid: req.user.id },
            shareMoney: { ...dta.shareMoney, membershipId: dta.membershipId, userid: req.user.id },
            costOfLandBooking: { ...dta.costOfLandBooking, membershipId: dta.membershipId, userid: req.user.id },
            cornerCharges: { ...dta.cornerCharges, membershipId: dta.membershipId, userid: req.user.id },
            developmentCharges: { ...dta.developmentCharges, membershipId: dta.membershipId, userid: req.user.id },
            electricityCharges: { ...dta.electricityCharges, membershipId: dta.membershipId, userid: req.user.id }
        }));

        for (const entry of updatedCharges) {
            for (const [key, charge] of Object.entries(entry)) {
                if (charge.amount === 0 && charge.balance === 0 && charge.downpayment === 0) continue;
                const existingCharge = await Charges.findOne({
                    chargeName: charge.chargeName,
                    membershipId: charge.membershipId
                });

                if (!existingCharge) {
                    const newCharge = await Charges.create({
                        userid: charge.userid,
                        membershipId: charge.membershipId,
                        chargeName: charge.chargeName,
                        chargesAmount: charge.amount,
                        downpayment: charge.downpayment,
                        balance: charge.balance,
                        isInstallmentEnabled: false
                    });
                    const newPayment = await Payments.create({
                        userid: charge.userid,
                        recept: count.Rid,
                        amount: charge.amount,
                        paidAmount: charge.downpayment,
                        balance: charge.balance,
                        installmentNumber: 1,
                        fineAmount: 0,
                        discount: 0,
                        extraAmount: 0,
                        fine: 0,
                        chargeId: newCharge._id,
                        paymentStatus: charge.amount === charge.downpayment && charge.balance === 0 ? "completed" : 'pending'
                    });

                    await Charges.updateOne(
                        { _id: newCharge._id },
                        { $push: { paymentSchedule: newPayment._id } }
                    );
                    count.Rid = count.Rid + 1;
                    count.save()
                }
            }
        }

        res.status(200).json({ message: "Membership import and charges processing completed successfully." });
    } catch (error) {
        console.error("Error in importMembership:", error);
        res.status(500).json({ error: "An error occurred during membership import and charges processing." });
    }
};
const updateOwnerStatus = async () => {
    try {
        const allOwners = await Owner.find();

        for (let owner of allOwners) {
            const membership = await Membership.findOne({ "owners.owner": owner._id });

            if (!membership) {
                if (owner.status !== 'Inactive') {
                    await Owner.updateOne({ _id: owner._id }, { status: 'Inactive' });
                    console.log(`Owner ${owner.ownerName} set to Inactive.`);
                }
            } else {
                if (owner.status !== 'Active') {
                    await Owner.updateOne({ _id: owner._id }, { status: 'Active' });
                    console.log(`Owner ${owner.ownerName} set to Active.`);
                }
            }
        }
    } catch (error) {
        console.error('Error updating owner status:', error);
    }
};
const updateMembership = async (req, res) => {
    try {
        const {
            phase, block, plotNo, purpose, property, propertyType, landSize, landUnit,
            D1, D2, cost, discountpkr, discountPer, country, province, city, locationUrl,
            address, nominees, notes
        } = req.body;
        const features = Object.keys(req.body).filter(key => req.body[key] === true);

        // Check if block is a valid ObjectId
        const isBlockObjectId = mongoose.isValidObjectId(block);

        // Prepare the data object for updating the Membership
        let data = {
            phase, block, plotNo, purpose, property, propertyType, landSize, landUnit,
            D1, D2, cost, discountpkr, discountPer, country, province, city, locationUrl,
            address, nominees, notes,
            features: features.length > 0 ? features : undefined  // Add features if any true values
        };
        if (phase && block) {
            if (!isBlockObjectId) {
                const findblock = await Block.findOne({ phaseid: phase, block_name: block });
                if (findblock) {
                    data.block = findblock._id;
                } else {
                    const newBlock = await Block.create({ phaseid: phase, block_name: block, userid: req.user.id });
                    data.block = newBlock._id;
                }
            }
        }
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
        const updatedMembership = await Membership.findByIdAndUpdate(
            req.params.id,
            { $set: data },
            { new: true, runValidators: true }  // Options to return updated document and run schema validation
        );
        if (!updatedMembership) {
            return res.status(404).json({ message: 'Membership not found' });
        }
        res.status(200).json({
            message: 'Membership updated successfully',
            membership: updatedMembership
        });
    } catch (error) {
        console.error('Error updating membership:', error);
        res.status(500).json({ message: 'An error occurred while updating the membership', error });
    }
};



module.exports = { addMemberShip, fetchAllMemberships, fetchMembershipByid, importMembership, updateOwnerStatus, updateMembership };
