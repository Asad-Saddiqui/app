const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
    userid: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    phaseid: { type: mongoose.Types.ObjectId, ref: "Phase", required: true },
    block_name: { type: String, required: true },
    block_location: { type: String, required: false },
    show: { type: Boolean, default: true },
    file: { type: mongoose.Types.ObjectId, ref: "Upload" }
}, { timestamps: true });


module.exports = mongoose.model('Block', blockSchema);
