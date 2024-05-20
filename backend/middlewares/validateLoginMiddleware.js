import { body, validationResult } from 'express-validator';

const validateLogin = [
  // Validation and sanitization rules
  body('userName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Username is required'),
  
  body('password')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Password is required'),

  // Custom validation to check for errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    next();
  }
];

export default validateLogin;
