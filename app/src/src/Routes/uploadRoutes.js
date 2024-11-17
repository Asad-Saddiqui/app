// routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const { uploadFile, deleteFile } = require('../Controllers/fileUploader/uploadController');
const { verifyaccessToken, RolePermission, hasAccess } = require('../Middlewares/authMiddleware');

// Route for uploading a file
router.post('/upload', verifyaccessToken, uploadFile);
router.delete('/upload/:fileId', verifyaccessToken, RolePermission('ADMIN'), hasAccess('ADMIN', 'Delete'), deleteFile);
module.exports = router;
