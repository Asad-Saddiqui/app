const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: {
    type: [{ type: String, enum: ['ADMIN', 'ACCOUNTANT', 'DATA_ENTRY', 'AGENT', 'MANAGER'] }],
    required: true
  },

  permissions: {
    type: [{
      resource: { type: String, required: true },
      access: {
        View: { type: Boolean, required: true },
        Edit: { type: Boolean, required: true },
        Delete: { type: Boolean, required: true },
        Add: { type: Boolean, required: true }
      }
    }]
  },


  otp: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  refreshToken: { type: String, default: '' },
  show: { type: Boolean, default: true }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
