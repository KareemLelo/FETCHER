import { body, validationResult } from 'express-validator';

const validateFlightDetails = [
  body('flightDetails.departureDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid departure date'),
  
  body('flightDetails.arrivalDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid arrival date'),
  
  body('flightDetails.depFlightNumber')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Departure flight number is required if provided'),
  
  body('flightDetails.arrFlightNumber')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Arrival flight number is required if provided'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default validateFlightDetails;