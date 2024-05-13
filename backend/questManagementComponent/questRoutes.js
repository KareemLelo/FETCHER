import express from 'express';
import { createQuest, getAvailableQuests, getQuestByCreator } from './questController.js';
import { protectRoutes } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new quest
router.post('/postQuest', protectRoutes, createQuest);

router.get('/quests', getAvailableQuests);
router.get('/questsByCreator', protectRoutes, getQuestByCreator);

export default router;