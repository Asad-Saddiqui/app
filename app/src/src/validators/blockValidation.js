const { check } = require('express-validator');

// Validation middleware for adding or updating blocks
const addBlockValidation = [
    check('block_name')
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage('Block Name must be at least 3 characters long'),

    check('block_location')
        .notEmpty()
        .withMessage('Please provide a valid URL'),

    check('phaseid')
        .isMongoId()
        .withMessage('Invalid Phase ID format')
];

module.exports = {
    addBlockValidation,
};
