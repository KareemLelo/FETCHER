import jwt from 'jsonwebtoken';

export const protectRoutes = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Received token:', token);
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = {_id: decoded.id};
      next();
    } catch (error) {
      console.error('Not authorized, token failed', error);
      res.status(401).send('Not authorized, token failed');
    }
  }else{
    res.status(401).send('Not authorized, no token');
  }
};
