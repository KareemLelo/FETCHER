import { body, validationResult } from 'express-validator';

const validatePassportDetails = [
  body('passportDetails.passportNumber')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Passport number is required if provided'),
  
  body('passportDetails.nationality')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Nationality is required if provided'),
  
  body('passportDetails.passportExpDate')
    .optional()
    .isISO8601()//checks if a given input is a valid ISO 8601 date string
    .toDate()
    .withMessage('Invalid expiration date'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validatePassportDetails;
