import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile, updatePassportDetails, updateFlightDetails, updateAlreadyThere, acceptQuest,getTrackOrderUserProfile} from './userController.js';
import { addBankAccount, getBankAccount, updateBankAccount } from './userController.js';
import validateRegistration from '../middlewares/validateRegistrationMiddleware.js'; 
import validateLogin from '../middlewares/validateLoginMiddleware.js'; 
import validateProfileUpdate from '../middlewares/validateProfileUpdateMiddleware.js';
import validatePassportDetails from '../middlewares/validatePassportMiddleware.js';
import validateFlightDetails from '../middlewares/validateFlightMiddleware.js';
import validateAlreadyThere from '../middlewares/validateAlreadyThereMiddleware.js';
import validateAcceptQuest from '../middlewares/validateAcceptQuestMiddleware.js';
import validateAddBankAccount from '../middlewares/validateAddBankAccountMiddleware.js';
import validateUpdateBankAccount from '../middlewares/validateUpdateBankAccountMiddleware.js';
import {protectRoutes} from '../middlewares/authenticationMiddleware.js'

const router = express.Router();

//public routes
router.post('/register', validateRegistration,registerUser);
router.post('/login',validateLogin, loginUser);

//protected routes
router.get('/profile/me', protectRoutes, getUserProfile);
router.put('/profile/me', protectRoutes, validateProfileUpdate, updateUserProfile);
router.get('/profile/:id', protectRoutes,getTrackOrderUserProfile)
router.put('/profile/passport', protectRoutes, validatePassportDetails, updatePassportDetails);
router.put('/profile/flightDetails', protectRoutes, validateFlightDetails, updateFlightDetails);
router.put('/profile/alreadyThere', protectRoutes, validateAlreadyThere, updateAlreadyThere);
router.put('/quest/accept/:questId', protectRoutes, validateAcceptQuest, acceptQuest);

// Bank Account routes
router.post('/bankAccount', protectRoutes, validateAddBankAccount, addBankAccount);
router.get('/bankAccount', protectRoutes, getBankAccount);
router.put('/bankAccount', protectRoutes, validateUpdateBankAccount, updateBankAccount);

export default router;