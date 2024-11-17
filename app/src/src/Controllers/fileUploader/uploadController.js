const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Upload = require('../../Models/Upload'); // Adjust the path as needed

// Set up storage and file filter for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fileType = path.extname(file.originalname).toLowerCase();

        if (fileType === '.pdf') {
            cb(null, 'uploads/pdfs/');
        } else if (['.jpeg', '.jpg', '.png', '.gif'].includes(fileType)) {
            cb(null, 'uploads/images/');
        } else {
            cb(new Error('Unsupported file type! Only images and PDFs are allowed.'));
        }
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    },
});

// File filter to allow only images and PDFs
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif|pdf/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only images and PDFs are allowed!'));
    }
};

// Initialize Multer
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});

// File upload handler
exports.uploadFile = (req, res) => {
    upload.single('file')(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            // Multer-specific error
            return res.status(400).json({ status: 400, message: err.message });
        } else if (err) {
            // Other errors
            return res.status(400).json({ status: 400, message: err.message });
        }
        if (req.file) {
            // Determine the file type based on the MIME type
            let fileType;
            const mimeType = req.file.mimetype;
            if (mimeType === 'application/pdf') {
                fileType = 'pdf';
            } else if (mimeType.startsWith('image/')) {
                fileType = 'image';
            }

            // Save the file details to the database
            try {
                const upload = new Upload({
                    originalName: req.file.originalname,
                    filePath: `${req.file.filename}`,
                    fileType: fileType,
                    user: req.user.id, // Associate the file with the user
                });
                await upload.save();

                return res.status(200).json({
                    status: 'success',
                    message: 'File uploaded successfully',
                    file: upload
                });
            } catch (saveError) {
                return res.status(500).json({ status: 500, message: 'Failed to save file details' });
            }
        } else {
            return res.status(400).json({ status: 400, message: 'No file uploaded' });
        }
    });
};

exports.deleteFile = async (req, res) => {
    try {
        // Find the file in the database
        const file = await Upload.findById(req.params.fileId);

        if (!file) {
            return res.status(404).json({ status: 404, message: 'File not found' });
        }

        // Determine the file path based on file type
        let filePath;
        if (file.fileType === 'pdf') {
            filePath = path.join(__dirname, '../../../uploads/pdfs/', file.filePath);
        } else if (file.fileType === 'image') {
            filePath = path.join(__dirname, '../../../uploads/images/', file.filePath);
        } else {
            return res.status(400).json({ status: 400, message: 'Unsupported file type' });
        }


        fs.unlink(filePath, async (err) => {
            if (err) {
                return res.status(500).json({ status: 500, message: 'Failed to delete file' });
            }

            // Delete the file record from the database
            const file_ = await Upload.findByIdAndDelete(req.params.fileId);
            if (file_) {
                return res.status(200).json({ status: 200, message: 'File Deleted Successfully' });
            } else {
                return res.status(500).json({ status: 500, message: 'Failed to delete file record' });
            }
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error' });
    }
};