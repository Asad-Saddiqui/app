const mongoose = require('mongoose');

const countSchema = new mongoose.Schema({
    Rid: { type: Number, default: 1 },
    Mid: { type: Number, default: 1 },
    Oid: { type: Number, default: 1 },
    Tid: { type: Number, default: 1 },
}, { timestamps: true });


module.exports = mongoose.model('Count', countSchema);
