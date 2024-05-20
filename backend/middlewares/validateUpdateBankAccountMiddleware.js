import { body, validationResult } from 'express-validator';

const validateUpdateBankAccount = [
  body('cardHolderName')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Card holder name is required if provided'),

  body('cardNumber')
    .optional()
    .trim()
    .isCreditCard()
    .withMessage('Invalid card number'),

  body('cvv')
    .optional()
    .trim()
    .isLength({ min: 3, max: 4 })
    .withMessage('Invalid CVV'),

  body('expDate.expMonth')
    .optional()
    .isInt({ min: 1, max: 12 })
    .withMessage('Invalid expiration month'),

  body('expDate.expYear')
    .optional()
    .isInt({ min: new Date().getFullYear() })
    .withMessage('Invalid expiration year'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validateUpdateBankAccount;