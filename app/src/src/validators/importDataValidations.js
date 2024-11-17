const { body, validationResult } = require('express-validator');

// Validation middleware
const validatePlotData = [
    body('phase').isString().withMessage('Phase must be a number'),
    body('data').isArray().withMessage('Data must be an array'),

    // Validate each plot entry in the data array
    body('data.*.S. No.').isNumeric().withMessage('S. No. must be a number'),

    // Validate Allocation of Plot
    body('data.*.Allocation of Plot.plot no.')
        .notEmpty().withMessage('Plot no. is required'),
    body('data.*.Allocation of Plot.street no.')
        .isNumeric().withMessage('Street no. must be a number'),
    body('data.*.Allocation of Plot.block no.')
        .notEmpty().withMessage('Block no. is required'),

    // Validate Size of Plot
    body('data.*.Size of Plot')
        .notEmpty().withMessage('Size of Plot is required'),

    // Validate Allottee / Purchaser
    body('data.*.Allottee / Purchaser.m. s. no.')
        .notEmpty().withMessage('M. S. No. is required'),
    body('data.*.Allottee / Purchaser.name')
        .notEmpty().withMessage('Name is required'),
    body('data.*.Allottee / Purchaser.father\'s/ husband name')
        .notEmpty().withMessage('Father\'s/Husband name is required'),
    body('data.*.Allottee / Purchaser.address')
        .notEmpty().withMessage('Address is required'),
    body('data.*.Allottee / Purchaser.cnic')
        .isLength({ min: 13, max: 13 }).withMessage('CNIC must be 13 digits long'),
    body('data.*.Allottee / Purchaser.contact no.')
        .notEmpty().withMessage('Contact no. is required'),

    // Validate Cost of Plot
    body('data.*.Cost of Plot.memberhsip fee')
        .isNumeric().withMessage('Membership fee must be a number'),
    body('data.*.Cost of Plot.share money')
        .isNumeric().withMessage('Share money must be a number'),
    body('data.*.Cost of Plot.cost of land / booking')
        .isNumeric().withMessage('Cost of land/booking must be a number'),
    body('data.*.Cost of Plot.coner / main road / park facing / service road charges')
        .isNumeric().withMessage('Charges for corner/main road/park facing/service road must be a number'),
    body('data.*.Cost of Plot.development charges / installments')
        .isNumeric().withMessage('Development charges/installments must be a number'),
    body('data.*.Cost of Plot.electricty / sui gass charges')
        .isNumeric().withMessage('Electricity/Sui gas charges must be a number'),
    body('data.*.Total Cost of Plot')
        .isNumeric().withMessage('Total Cost of Plot must be a number'),

    // Validate Payments of Plot
    body('data.*.Payments of Plot.memberhsip fee')
        .isNumeric().withMessage('Membership fee in Payments must be a number'),
    body('data.*.Payments of Plot.share money')
        .isNumeric().withMessage('Share money in Payments must be a number'),
    body('data.*.Payments of Plot.cost of land / booking')
        .isNumeric().withMessage('Cost of land/booking in Payments must be a number'),
    body('data.*.Payments of Plot.coner / main road / park facing / service road charges')
        .isNumeric().withMessage('Charges in Payments must be a number'),
    body('data.*.Payments of Plot.development charges / installments')
        .isNumeric().withMessage('Development charges/installments in Payments must be a number'),
    body('data.*.Payments of Plot.electricty / sui gass charges')
        .isNumeric().withMessage('Electricity/Sui gas charges in Payments must be a number'),
    body('data.*.Total Amount of Plot')
        .isNumeric().withMessage('Total Amount of Plot must be a number'),

    // Validate Dues of Plot
    body('data.*.Dues of Plot.memberhsip fee')
        .isNumeric().withMessage('Membership fee in Dues must be a number'),
    body('data.*.Dues of Plot.share money')
        .isNumeric().withMessage('Share money in Dues must be a number'),
    body('data.*.Dues of Plot.cost of land / booking')
        .isNumeric().withMessage('Cost of land/booking in Dues must be a number'),
    body('data.*.Dues of Plot.coner / main road / park facing / service road charges')
        .isNumeric().withMessage('Charges in Dues must be a number'),
    body('data.*.Dues of Plot.development charges / installments')
        .isNumeric().withMessage('Development charges/installments in Dues must be a number'),
    body('data.*.Dues of Plot.electricty / sui gass charges')
        .isNumeric().withMessage('Electricity/Sui gas charges in Dues must be a number'),
    body('data.*.Total Dues / Outstanding')
        .isNumeric().withMessage('Total Dues / Outstanding must be a number'),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};



module.exports = { validatePlotData, handleValidationErrors };
