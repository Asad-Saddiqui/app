const mongoose = require('mongoose');
const { Schema } = mongoose;

const uploadSchema = new Schema({
    originalName: {
        type: String,
        required: true,
    },
    filePath: {
        type: String,
        required: true,
    },
    fileType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['PENDING', 'USED'],
        default: 'PENDING',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User who uploaded the file
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
