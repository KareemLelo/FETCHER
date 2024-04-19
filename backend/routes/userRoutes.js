import express from 'express';
import { registerUser } from '../controllers/userController.js';
import { loginUser } from '../controllers/userController.js';
import validateRegistration from '../middlewares/validateRegistration.js'

const router = express.Router();

router.post('/register', validateRegistration,registerUser);
router.post('/login',loginUser);

export default router;
