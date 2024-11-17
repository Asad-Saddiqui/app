const mongoose = require('mongoose');
const { Schema } = mongoose;

const transferSchema = new Schema({
    sellerName: [
        {
            owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
            share: { type: String, required: false },
            dateAdded: { type: Date, default: Date.now }
        }
    ],
    status: {
        type: String,
        default: false
    },
    agent: {
        type: String,
        default: false
    },
    fileId: {
        type: Schema.Types.ObjectId, // Array of ObjectId to store multiple sellers
        required: true,
        ref: 'Membership'
    },
    image: { type: mongoose.Types.ObjectId, ref: "Upload" },
    image1: { type: mongoose.Types.ObjectId, ref: "Upload" },

    sellerWitness: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Owner'
    },
    tNo: { type: String, required: false },
    sellerNominee: [
        {
            nominee: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', },
            owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner' },
            relationship: { type: String, required: false }
        }
    ],
    purchasers: [
        {
            owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
            share: { type: String, required: false },
            dateAdded: { type: Date, default: Date.now }
        }
    ],
    purchaserWitness: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'Owner'
    },

    chargesTransfer: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Transfer = mongoose.model('Transfer', transferSchema);
module.exports = Transfer;
