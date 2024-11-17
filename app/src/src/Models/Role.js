const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    Roles: {
        type: String,
        required: true,
        unique: true,
        uppercase: true, // To store role names in uppercase
    },
    description: {
        type: String,
        required: true,
    },
    permissions: {
        type: [String], // Array of permissions
        default: [],
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    }],
}, { timestamps: true });

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
