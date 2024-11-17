const mongoose = require('mongoose');

const phaseSchema = new mongoose.Schema({
    userid: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    phase_name: { type: String, required: true },
    phase_location: { type: String, required: true },
    show: { type: Boolean, default: true }

}, { timestamps: true });


module.exports = mongoose.model('Phase', phaseSchema);
