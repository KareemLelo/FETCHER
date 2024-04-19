import express from 'express';
import { getUserProfile, registerUser } from '../controllers/userController.mjs';
import { loginUser } from '../controllers/userController.mjs';
import validateRegistration from '../middlewares/validateRegMiddleware.js'
import {protectRoutes} from '../middlewares/authMiddleware.js'

const router = express.Router();

//public routes
router.post('/register', validateRegistration,registerUser);
router.post('/login',loginUser);

//protected routes
router.route('/profile/:_id').get(protectRoutes,getUserProfile);
export default router;
