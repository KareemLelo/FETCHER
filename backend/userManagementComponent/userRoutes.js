import express from 'express';
import { getUserProfile, registerUser, loginUser, updateUserProfile, updateAlreadyThere, updatePassportDetails, updateFlightDetails, acceptQuest} from './userController.js';
import { addBankAccount, getBankAccount, updateBankAccount } from './userController.js';
import validateRegistration from '../middlewares/validateRegMiddleware.js'; 
import validateProfileUpdate from '../middlewares/validateProfileUpdateMiddleware.js';
import {protectRoutes} from '../middlewares/authMiddleware.js'

const router = express.Router();

//public routes
router.post('/register', validateRegistration,registerUser);
router.post('/login',loginUser);

//protected routes
router.get('/profile/me', protectRoutes, getUserProfile);
router.put('/profile/me', protectRoutes, validateProfileUpdate, updateUserProfile);
router.put('/profile/passport', protectRoutes, updatePassportDetails);
router.put('/profile/flightDetails', protectRoutes, updateFlightDetails);
router.put('/profile/alreadyThere', protectRoutes, updateAlreadyThere);
router.put('/quest/accept/:questId', protectRoutes, acceptQuest);

// Bank Account routes
router.post('/bankAccount', protectRoutes, addBankAccount);
router.get('/bankAccount', protectRoutes, getBankAccount);
router.put('/bankAccount', protectRoutes, updateBankAccount);
export default router;
