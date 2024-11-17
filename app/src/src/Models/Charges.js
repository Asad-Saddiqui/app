const mongoose = require('mongoose');

const ChargesSchema = new mongoose.Schema({
    userid: { type: mongoose.Types.ObjectId, ref: "User", required: true, index: true },
    membershipId: { type: mongoose.Types.ObjectId, ref: "Membership", required: true },
    chargeName: { type: String, required: true },
    chargesAmount: { type: Number, required: true, },
    downpayment: { type: Number, required: true, },
    installmentType: { type: String },
    numberOfPayments: { type: Number, required: false, },
    fine: { type: Number, required: false, default: 0 },
    balance: { type: Number, default: 0 },
    fineAmount: { type: Number, default: 0 },
    paymentSchedule: { type: [mongoose.Types.ObjectId], ref: "Payments", required: false },
    isInstallmentEnabled: { type: Boolean, required: true },
}, { timestamps: true });


module.exports = mongoose.model('Charges', ChargesSchema);
