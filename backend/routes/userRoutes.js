import express from 'express';
//import { getUserProfile, registerUser,loginUser, updateUserProfile } from '../controllers/userController.js';
import validateRegistration from '../middlewares/validateRegMiddleware.js'
import { registerUser,loginUser } from '../controllers/userController.js';

//import {protectRoutes} from '../middlewares/authMiddleware.js'
//import validateProfileUpdate from '../middlewares/validateProfileUpdate.js';
const router = express.Router();

//public routes
router.post('/register', validateRegistration,registerUser);
router.post('/login',loginUser);

//protected routes
//router.route('/profile/:_id').get(protectRoutes,getUserProfile);
//router.route('/profile').put(protectRoutes, validateProfileUpdate, updateUserProfile);

export default router;