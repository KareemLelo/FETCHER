import jwt from 'jsonwebtoken';

export const protectRoutes = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {_id: decoded.id};  // Verify decoded token contains the ID
      next();
    } catch (error) {
      console.error('Not authorized, token failed', error);
      res.status(401).send('Not authorized, token failed');
    }
  } else {
    res.status(401).send('Not authorized, no token');
  }
};
