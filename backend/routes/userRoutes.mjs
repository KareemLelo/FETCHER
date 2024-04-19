import express from 'express';
import { registerUser } from '../controllers/userController.mjs';
import { loginUser } from '../controllers/userController.mjs';
import validateRegistration from '../middlewares/validateRegistration.js'

const router = express.Router();

router.post('/register', validateRegistration,registerUser);
router.post('/login',loginUser);

export default router;
