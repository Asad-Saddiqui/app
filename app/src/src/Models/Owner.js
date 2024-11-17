const mongoose = require('mongoose');

const OwnerSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId, ref: "User"
    },
    familyName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    whatsappNumber: {
        type: String,
    },
    ntnNumber: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    cnic: {
        type: String,
        required: true,
        unique: true,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    permanentAddress: {
        type: String,
    },
    cnicFrontImage: {
        type: mongoose.Types.ObjectId, ref: "Upload", required: false,
    },
    cnicBackImage: {
        type: mongoose.Types.ObjectId, ref: "Upload"

    },
    profileImage: {
        type: mongoose.Types.ObjectId, ref: "Upload"
    },
    userType: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Inactive',
    },
    OwnerId: {
        type: String,
    },
}, { timestamps: true });


module.exports = mongoose.model('Owner', OwnerSchema);
