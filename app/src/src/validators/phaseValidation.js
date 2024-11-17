const { check } = require('express-validator');

const addPhaseValidation = [
    check('phase_name')
        .notEmpty()
        .isLength({ min: 3 })
        .withMessage('Phase Name must be at least 3 characters long'),

    check('phase_location')
        .notEmpty()
        .isURL()
        .withMessage('Please provide a valid url')
];

module.exports = {
    addPhaseValidation,
};
