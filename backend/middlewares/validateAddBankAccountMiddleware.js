import { body, validationResult } from 'express-validator';

const validateAddBankAccount = [
  body('cardHolderName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Card holder name is required'),

  body('cardNumber')
    .trim()
    .isCreditCard()
    .withMessage('Invalid card number'),

  body('cvv')
    .trim()
    .isLength({ min: 3, max: 4 })
    .withMessage('Invalid CVV'),

  body('expDate.expMonth')
    .isInt({ min: 1, max: 12 })
    .withMessage('Invalid expiration month'),

  body('expDate.expYear')
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

export default validateAddBankAccount;