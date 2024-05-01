import express from 'express';
import { createQuest } from '../controllers/questController.js';
//import { protectRoutes } from '../middlewares/authMiddleware.js'; // if you want to protect the route

const router = express.Router();

// Create a new quest
//router.post('/', protectRoutes, createQuest);
router.post('/postQuest',createQuest);
export default router;