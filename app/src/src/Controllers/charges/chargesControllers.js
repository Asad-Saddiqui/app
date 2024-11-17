const Charges = require("../../Models/Charges");
const Payments = require("../../Models/Payments");
const dayjs = require('dayjs'); // Importing Day.js
const markOverduePayments = async () => {
    try {
        const today = dayjs().startOf('day'); // Get the current date using Day.js

        // Fetch all charges to process their payments and update balance
        const allCharges = await Charges.find().populate('paymentSchedule');

        for (let charge of allCharges) {
            let totalFine = 0;
            let hasOverduePayments = false;

            // Loop through each payment for the charge
            for (let paymentId of charge.paymentSchedule) {
                const payment = await Payments.findById(paymentId);

                // Ensure payment exists and is pending
                if (payment && payment.paymentStatus === 'pending') {
                    const dueDate = dayjs(payment.dueDate); // Parse dueDate with Day.js

                    // Check if payment is overdue
                    if (dueDate.isBefore(today)) {
                        hasOverduePayments = true;

                        const overdueDays = today.diff(dueDate, 'day'); // Days overdue

                        // Update extraDays if it's overdue
                        payment.extraDays = overdueDays;

                        // Apply fine logic (fine per overdue day * charge's fine rate)
                        const fineForPayment = overdueDays * charge.fine;
                        payment.fineAmount = fineForPayment; // Update fine amount for the payment
                        totalFine += fineForPayment;

                        // Update payment's balance (original amount + fine)
                        payment.balance = payment.amount + payment.fineAmount;

                        // Mark payment as overdue and update necessary fields
                        await Payments.findByIdAndUpdate(paymentId, {
                            paymentStatus: 'overdue',
                            extraDays: payment.extraDays,
                            fineAmount: payment.fineAmount,
                            balance: payment.balance // Correctly update balance
                        });
                    } else {


                        await Payments.findByIdAndUpdate(paymentId, {
                            balance: payment.amount + payment.fineAmount // Correctly update balance
                        });
                        // If the payment is not overdue, keep track of previous extraDays for future payments
                        if (payment.extraDays > 0) {
                            // Assuming you want to carry forward any extraDays to the next payment
                            const nextPaymentId = getNextPaymentId(charge.paymentSchedule, paymentId); // Function to get next payment ID
                            if (nextPaymentId) {
                                await Payments.findByIdAndUpdate(nextPaymentId, {
                                    extraDays: (await Payments.findById(nextPaymentId)).extraDays + payment.extraDays,
                                });
                            }
                        }
                    }
                }
            }

            // If there were any overdue payments, update the balance for the charge
            if (hasOverduePayments) {
                charge.balance += totalFine;
                charge.fineAmount += totalFine; // Add to total fine amount for the charge
                await charge.save(); // Save updated charge with new balance and fines
            }
        }

        console.log("Overdue payments processed and fines applied.");
    } catch (error) {
        console.error("Error marking overdue payments:", error);
    }
};

// Helper function to find the next payment ID in the schedule
const getNextPaymentId = (paymentSchedule, currentPaymentId) => {
    const index = paymentSchedule.indexOf(currentPaymentId);
    if (index !== -1 && index < paymentSchedule.length - 1) {
        return paymentSchedule[index + 1]; // Return the next payment ID
    }
    return null; // No next payment found
};



const addCharges = async (req, res) => {
    try {
        const {
            chargeName,
            chargesAmount,
            downpayment,
            installmentType,
            numberOfPayments,
            paymentSchedule,
            isInstallmentEnabled,
            membershipId,
            fine // Array of membership IDs
        } = req.body;

        const userId = req.user.id; // Assuming you get the user ID from middleware

        // Create charge data array
        let chargesArray = membershipId.map((id) => {
            return {
                userid: userId,
                membershipId: id,
                chargeName,
                chargesAmount,
                downpayment: downpayment ? downpayment : 0,
                installmentType,
                numberOfPayments: numberOfPayments ? numberOfPayments : 1,
                isInstallmentEnabled,
                paymentSchedule: [],
                fine,
                balance: chargesAmount - (downpayment || 0) // Initial balance
            };
        });

        // Calculate payment schedules for each membership
        let allChargesWithPayments = await Promise.all(chargesArray.map(async (charge) => {
            let paymentIds = [];
            // if (isInstallmentEnabled && downpayment < chargesAmount) {

            if (isInstallmentEnabled) {
                const paymentPromises = paymentSchedule.map(async (payment) => {
                    const newPayment = new Payments({
                        userid: userId,
                        amount: payment.amount,
                        dueDate: new Date(payment.dueDate), // Ensure date conversion
                        fine,
                        installmentNumber: payment.installmentNumber,
                        paymentStatus: 'pending', // Default status as pending
                    });

                    const savedPayment = await newPayment.save();
                    return savedPayment._id; // Save payment ID
                });

                paymentIds = await Promise.all(paymentPromises); // Wait for all promises
            } else {
                // If installments are not enabled, create a single payment
                const fullPayment = new Payments({
                    userid: userId,
                    amount: chargesAmount, // Full charge amount since no installments
                    downpayment: downpayment ? downpayment : 0,
                    dueDate: new Date(), // Set due date as current date
                    installmentNumber: 1, // Only one installment
                    paymentStatus: 'pending',
                });

                const savedPayment = await fullPayment.save();
                paymentIds.push(savedPayment._id); // Save the single payment ID
            }

            // Attach payment schedule to charge
            charge.paymentSchedule = paymentIds;
            return charge;
        }));

        // Save all charges to the database
        const newCharges = await Charges.insertMany(allChargesWithPayments);

        // Update Payments with chargeId
        await Promise.all(newCharges.map(async (charge) => {
            const paymentIds = charge.paymentSchedule; // Get the payment IDs from the charge
            if (paymentIds.length > 0) {
                await Payments.updateMany(
                    { _id: { $in: paymentIds } }, // Match payments by their IDs
                    { $set: { chargeId: charge._id } },
                    { new: true }
                );
            }
        }));

        // Assuming markOverduePayments is a function that checks overdue payments
        markOverduePayments();

        // Respond with success message and charge data
        res.status(201).json({
            message: "Charges and payments created successfully",
            charges: newCharges,
        });

    } catch (error) {
        console.error("Error adding charges:", error);
        return res.status(500).json({
            status: 500,
            errors: [{
                type: "field",
                msg: "Error in Add Charges",
            }]
        });
    }
};








const receivePayments = async (req, res) => {
    try {
        // Extract relevant fields from the request body
        const { paymentId, paidAmount, discount, receivingDate, cashType, refNo, bank } = req.body;
        const userId = req.user.id; // Assuming user ID is retrieved from middleware
        console.log('req.body', req.body)

        // Find the payment by ID and ensure it belongs to the logged-in user
        const payment = await Payments.findOne({ _id: paymentId, userid: userId });

        if (!payment) {
            return res.status(404).json({
                status: 404,
                errors: [{ msg: "Payment not found or unauthorized." }]
            });
        }

        if (payment.paymentStatus === 'completed') {
            return res.status(400).json({
                status: 400,
                errors: [{ msg: "Payment has already been completed." }]
            });
        }

        // Calculate new paidAmount, discount, and remaining balance for this payment
        const totalDiscount = discount || 0; // Default to 0 if no discount is provided
        const newPaidAmount = parseInt(payment.paidAmount) + parseInt(paidAmount) + parseInt(totalDiscount);
        const totalAmountDue = payment.amount + payment.fineAmount;
        let remainingBalance = totalAmountDue - newPaidAmount;

        // Update payment status based on whether the full amount has been paid
        let paymentStatus = remainingBalance <= 0 ? 'completed' : 'pending';

        payment.paidAmount = remainingBalance < 0 ? parseInt(payment.amount) + parseInt(payment.fineAmount) - parseInt(totalDiscount) : newPaidAmount;
        payment.balance = remainingBalance > 0 ? remainingBalance : 0;
        payment.paymentStatus = paymentStatus;
        payment.discount = parseInt(totalDiscount);
        payment.receivingDate = receivingDate; // Store the receiving date
        payment.cashType = cashType;
        payment.bank = bank ? bank : "";
        payment.refNo = refNo ? refNo : ""
        await payment.save();

        // Now, update the corresponding charge's balance and total fine if applicable
        const charge = await Charges.findOne({ paymentSchedule: paymentId });

        if (charge) {
            // Deduct the payment from the charge's balance
            charge.balance -= paidAmount;
            if (charge.balance < 0) charge.balance = 0; // Ensure balance doesn't go negative
            await charge.save();
        }

        // Handle next overdue and pending payments if there is excess amount paid
        if (remainingBalance < 0) { // If there is an excess amount (remainingBalance is negative)
            let excessAmount = -remainingBalance; // Convert to positive excess amount

            // Fetch overdue and future pending payments
            const nextPayments = await Payments.find({
                chargeId: charge._id,
                paymentStatus: { $in: ['overdue', 'pending'] },
                dueDate: { $gte: payment.dueDate }
            }).sort({ dueDate: 1 });

            let lastPayment; // Variable to track the last processed payment

            if (nextPayments.length > 0) {
                for (const nextPayment of nextPayments) {
                    if (excessAmount <= 0) break;
                    const totalNextAmountDue = nextPayment.amount + nextPayment.fineAmount;
                    const nextPaymentNewPaidAmount = nextPayment.paidAmount + excessAmount;
                    const nextPaymentRemainingBalance = totalNextAmountDue - nextPaymentNewPaidAmount;

                    excessAmount = nextPaymentRemainingBalance < 0 ? -nextPaymentRemainingBalance : 0;

                    // Update the next payment amounts and status
                    nextPayment.paidAmount = nextPaymentRemainingBalance > 0
                        ? nextPaymentNewPaidAmount
                        : totalNextAmountDue;
                    nextPayment.balance = nextPaymentRemainingBalance > 0 ? nextPaymentRemainingBalance : 0;

                    // Add receiving date to the next payment
                    nextPayment.receivingDate = receivingDate;

                    // Update payment status based on whether it's fully paid
                    if (nextPaymentRemainingBalance <= 0) {
                        nextPayment.paymentStatus = 'completed';
                    } else if (nextPayment.dueDate < Date.now()) {
                        nextPayment.paymentStatus = 'overdue';
                    }
                    nextPayment.cashType = cashType;
                    nextPayment.bank = bank ? bank : "";
                    nextPayment.refNo = refNo ? refNo : ""
                    await nextPayment.save(); // Save the updated next payment

                    lastPayment = nextPayment; // Track the last payment in the loop
                }
            }

            // If any excess amount remains after applying it to all payments, add it to the last payment's extraAmount
            if (excessAmount > 0) {
                if (lastPayment) {
                    lastPayment.paidAmount = lastPayment.paidAmount + excessAmount
                    lastPayment.extraAmount = excessAmount;

                    await lastPayment.save();
                } else {
                    // If no next payments exist, save the excess amount as extraAmount in the current payment
                    payment.extraAmount = excessAmount;
                    await payment.save();
                }
            }
        }

        // Respond with success message
        res.status(200).json({
            message: "Payment received successfully.",
            payment,
            charge
        });

    } catch (error) {
        console.error("Error receiving payment:", error);
        return res.status(500).json({
            status: 500,
            errors: [{ type: "field", msg: "Error in receiving payment." }]
        });
    }
};







const getCharges = async (req, res) => {
    try {
        const id = req.params.id;
        const charges = await Charges.find({ membershipId: id })
            .populate('paymentSchedule') // Populate the related payment details
            .exec();

        // If no charges found, return a 404 response
        if (!charges || charges.length === 0) {
            return res.status(404).json({
                status: 404,
                errors: [{
                    type: "field",
                    msg: "No charges found for this membership.",
                }]
            });

        }

        // Return the charges with a success message
        return res.status(200).json({
            message: "Charges retrieved successfully.",
            data: charges,
        });
    } catch (error) {

        return res.status(500).json({
            status: 500,
            errors: [{
                type: "field",
                msg: "Error retrieving charges",
            }]
        });
    }
};


module.exports = { addCharges, receivePayments, markOverduePayments, getCharges };
