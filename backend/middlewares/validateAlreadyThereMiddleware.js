import { body, validationResult } from 'express-validator';

const validateAlreadyThere = [
  body('alreadyThere')
    .optional()
    .isBoolean()
    .withMessage('Already there must be a boolean value'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validateAlreadyThere;