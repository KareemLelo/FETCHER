import User from '../userManagementComponent/user.js';
import {body, validationResult} from 'express-validator';

const validateRegistration = [
  // Validation and sanitization rules
  body('firstName')
    .trim() // Removes whitespace from both ends of the string.
    .escape()//Replaces <, >, &, ', " and / with their corresponding HTML entities to prevent XSS attacks.
    .notEmpty()
    .withMessage('First name is required'),
  
  body('lastName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Last name is required'),
  
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),// Converts the email address to a standard format.
  
  body('accCategory')
    .isIn(['Fetcher', 'QuestMaker'])
    .withMessage('Invalid account category'),
  
  body('userName')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Username is required'),
  
  body('password')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
    .withMessage('Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character'),

  body('mobile')
    .trim()
    .escape()
    .isMobilePhone()//Validates the mobile number to ensure it's a proper phone format.
    .withMessage('Invalid mobile number'),
  
async (req,res,next) =>
{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, email } = req.body;
  const alreadyExists = await User.userNameOrEmailExists(userName, email);
  if (alreadyExists) {
    return res.status(409).json({ message: 'Username or email already in use' });
  }

  next();
}];
export default validateRegistration;