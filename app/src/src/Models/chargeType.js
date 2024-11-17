const mongoose = require('mongoose');

const chargeTypeSchema = new mongoose.Schema({
    userid: { type: mongoose.Types.ObjectId, ref: "User", required: true, index: true },
    chargeName: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('chargeType', chargeTypeSchema);
