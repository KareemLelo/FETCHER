import { body, validationResult } from 'express-validator';

const validateCreateQuest = [
  body('itemName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Item name is required'),

  body('itemCategory')
    .optional()
    .trim()
    .escape(),

  body('itemPrice')
    .isFloat({ min: 10 })
    .withMessage('Price must be at least 10'),

  body('itemQuantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),

  body('itemDirection')
    .optional()
    .trim()
    .escape(),

  body('itemWeight')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Weight must be a non-negative number'),

  body('itemLink')
    .optional()
    .trim()
    .isURL()
    .withMessage('Invalid URL'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validateCreateQuest;
