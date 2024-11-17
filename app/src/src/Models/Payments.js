const mongoose = require('mongoose');

const PaymentsSchema = new mongoose.Schema({
    userid: { type: mongoose.Types.ObjectId, ref: "User", required: true, index: true },
    amount: { type: Number, required: true },
    dueDate: { type: Date, required: true, default: Date.now },
    paidAmount: { type: Number, required: true, default: 0 },
    balance: { type: Number, required: true, default: 0 },
    installmentNumber: { type: Number, required: true },
    receivingDate: { type: Date, required: false },
    extraDays: { type: Number, required: true, default: 0 },
    cashType: { type: String, required: false },
    bank: { type: String, required: false, },
    refNo: { type: String, required: false },
    fineAmount: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    extraAmount: { type: Number, required: true, default: 0 },
    fine: { type: Number, required: false, default: 0 },
    chargeId: { type: mongoose.Types.ObjectId, ref: "Charges", required: false }, // Updated to required
    recept: { type: Number, required: true },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'overdue'], // Allowed values
        default: 'pending' // Default status
    }
}, { timestamps: true });

module.exports = mongoose.model('Payments', PaymentsSchema);
