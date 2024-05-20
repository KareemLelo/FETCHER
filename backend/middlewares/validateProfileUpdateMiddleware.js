import { body, validationResult } from 'express-validator';
import User from '../userManagementComponent/user.js';

const validateProfileUpdate = [
  // Validation and sanitization rules
  body('userName')
    .optional()
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Username is required if provided'),
  
  body('email')
    .optional()
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  
  body('mobile')
    .optional()
    .trim()
    .escape()
    .isMobilePhone()
    .withMessage('Invalid mobile number'),

  // Custom validation to ensure uniqueness
  async (req, res, next) => {
    const { userName, email, mobile } = req.body;
    const userId = req.user._id; // The ID from the JWT payload

    const userNameExists = userName && await User.findOne({ userName, _id: { $ne: userId } });
    const emailExists = email && await User.findOne({ email, _id: { $ne: userId } });
    const mobileExists = mobile && await User.findOne({ mobile, _id: { $ne: userId } });

    if (userNameExists) {
      return res.status(409).json({ message: "Username already in use" });
    } else if (emailExists) {
      return res.status(409).json({ message: "Email already in use" });
    } else if (mobileExists) {
      return res.status(409).json({ message: "Mobile number already in use" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  }
];

export default validateProfileUpdate;
