import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const protectRoutes = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.error('Not authorized, token failed', error);
      res.status(401).send('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401).send('Not authorized, no token');
  }
};