const { body } = require('express-validator');

// Validation rules
 const ownerValidationRules = () => {
    return [
        body('ownerName').notEmpty().withMessage('Owner name is required.'),
        body('familyName').notEmpty().withMessage('Family name is required.'),
        body('phoneNumber').notEmpty().isMobilePhone().withMessage('Phone number is required.'),
        body('email').optional().isEmail().withMessage('Must be a valid email.'),
        body('whatsappNumber').optional().isMobilePhone('any').withMessage('Must be a valid WhatsApp number.'),
        body('ntnNumber').optional().isNumeric().withMessage('NTN number must be numaric.'),
        body('dateOfBirth').optional().isString().withMessage('Date of birth must be a valid date.'),
        body('country').optional().isString().withMessage('Country must be a string.'),
        body('state').optional().isString().withMessage('State must be a string.'),
        body('city').optional().isString().withMessage('City must be a string.'),
        body('permanentAddress').optional().isString().withMessage('Permanent address must be a string.'),
        body('cnic').notEmpty().isNumeric().withMessage('CNIC is required.'),
        body('cnicFrontImage').notEmpty().withMessage('CNIC front image is required.'),
        body('cnicBackImage').notEmpty().withMessage('CNIC back image is required.'),
        body('profileImage').optional().isString().withMessage('Profile image must be a string.')
    ];
};


module.exports = {
    ownerValidationRules,
};
