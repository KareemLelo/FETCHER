import express from 'express';
import { getUserProfile, registerUser } from '../controllers/userController.js';
import { loginUser } from '../controllers/userController.js';
import validateRegistration from '../middlewares/validateRegMiddleware.js'
import {protectRoutes} from '../middlewares/authMiddleware.js'

const router = express.Router();

//public routes
router.post('/register', validateRegistration,registerUser);
router.post('/login',loginUser);

//protected routes
router.route('/profile/:_id').get(protectRoutes,getUserProfile);


router.get('/hello', (req, res) => {
    res.send('Hello, World!');
  });
export default router;
