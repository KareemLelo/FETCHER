import express from 'express';
import { getUserProfile, registerUser,loginUser, updateUserProfile} from './userController.js';
import validateRegistration from '../middlewares/validateRegMiddleware.js';
<<<<<<< HEAD:backend/routes/userRoutes.js
import validateProfileUpdate from '../middlewares/validateProfileUpdate.js'; 
/* import { registerUser,loginUser } from '../controllers/userController.js'; */
=======
import validateProfileUpdate from '../middlewares/validateProfileUpdateMiddleware.js';
//import { registerUser,loginUser } from '../controllers/userController.js';
>>>>>>> 8a40eda48cdcf1a5f9e0328b367952c3ff8db7f8:backend/userManagementComponent/userRoutes.js

import {protectRoutes} from '../middlewares/authMiddleware.js'
//import validateProfileUpdate from '../middlewares/validateProfileUpdate.js';
const router = express.Router();

//public routes
/* router.post('/register', validateRegistration,registerUser);
router.post('/login',loginUser); */

//protected routes
//router.route('/profile/:_id').get(protectRoutes,getUserProfile);
//router.route('/profile').put(protectRoutes, validateProfileUpdate, updateUserProfile);
<<<<<<< HEAD:backend/routes/userRoutes.js
router.get('/profile/:_id',getUserProfile)
router.post('/profile/update/:_id',updateUserProfile)
=======
//router.get('/profile',getUserProfile)
router.get('/profile', protectRoutes, getUserProfile);
router.post('/profile',validateProfileUpdate,updateUserProfile);
>>>>>>> 8a40eda48cdcf1a5f9e0328b367952c3ff8db7f8:backend/userManagementComponent/userRoutes.js

export default router;
