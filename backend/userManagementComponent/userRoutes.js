import express from 'express';
import { getUserProfile, registerUser,loginUser, updateUserProfile} from './userController.js';
import validateRegistration from '../middlewares/validateRegMiddleware.js'; 
import validateProfileUpdate from '../middlewares/validateProfileUpdateMiddleware.js';
import {protectRoutes} from '../middlewares/authMiddleware.js'
//import validateProfileUpdate from '../middlewares/validateProfileUpdate.js';
const router = express.Router();

//public routes
router.post('/register', validateRegistration,registerUser);
router.post('/login',loginUser);

//protected routes
//router.route('/profile/:_id').get(protectRoutes,getUserProfile);
//router.route('/profile').put(protectRoutes, validateProfileUpdate, updateUserProfile);

//router.get('/profile/:_id',getUserProfile)
//router.post('/profile/update/:_id',updateUserProfile)

//router.get('/profile',getUserProfile)
//router.get('/profile', protectRoutes, getUserProfile);
//router.post('/profile',validateProfileUpdate,updateUserProfile);

router.get('/profile/me', protectRoutes, getUserProfile);
router.post('/profile/update/:_id', protectRoutes, validateProfileUpdate, updateUserProfile);
router.post('/quest/accept/:questId', protectRoutes, acceptQuest);


export default router;
