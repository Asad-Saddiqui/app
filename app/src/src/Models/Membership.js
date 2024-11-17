const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
    newMembershipId: { type: String, required: true },
    oldMembershipId: { type: String, required: false },
    userId: {
        type: mongoose.Types.ObjectId, ref: "User"
    },
    phase: { type: mongoose.Schema.Types.ObjectId, ref: 'Phase', required: true },

    block: { type: mongoose.Schema.Types.ObjectId, ref: 'Block', required: true },
    purpose: { type: String, required: false },
    property: { type: String, required: false },
    propertyType: { type: String, required: false },
    status: { type: String, required: false },
    landSize: { type: Number, required: false },
    landUnit: { type: String, required: false },
    cost: { type: Number, required: false },
    discountpkr: { type: Number, required: false },
    discountPer: { type: Number, required: false },
    country: { type: String, required: false },
    province: { type: String, required: false },
    city: { type: String, required: false },
    locationUrl: { type: String, required: false },
    address: { type: String, required: false },
    D1: { type: String, required: false },
    D2: { type: String, required: false },
    plotNo: { type: String, required: false },
    transferNo: { type: String, required: false },
    transferCount: { type: Number, required: false },
    fileCount: { type: Number, required: false },
    status: {
        type: String,
        enum: [
            'Draft',
            'Closed',
            'Open',
            'Pending',
            "Open File"
        ],
        default: 'Draft'
    },
    owners: [
        {
            owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
            share: { type: String, required: true },
            dateAdded: { type: Date, default: Date.now }
        }
    ],
    nominees: [
        {
            nominee: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: false },
            owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: false },
            relationship: { type: String, required: false }
        }
    ],
    notes: { type: String, required: false },
    features: { type: [String], default: [] } // Array of strings for features
});

// Create a model from the schema
const Membership = mongoose.model('Membership', MembershipSchema);

module.exports = Membership;
