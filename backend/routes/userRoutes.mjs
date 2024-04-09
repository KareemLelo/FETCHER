// routes/userRoutes.js
import express from 'express';
import { registerUser } from '../controllers/userController.mjs';
import { loginUser } from '../controllers/userController.mjs';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login',loginUser);

export default router;
