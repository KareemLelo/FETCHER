import express from 'express';
import { createQuest, getAvailableQuests, fetchQuestByCreator } from './questController.js';
import { protectRoutes } from '../middlewares/authMiddleware.js'; // if you want to protect the route

const router = express.Router();

// Create a new quest
//router.post('/', protectRoutes, createQuest);
router.post('/postQuest', protectRoutes, createQuest);

router.get('/quests', getAvailableQuests);
router.get('/questsByCreator', protectRoutes, fetchQuestByCreator);

export default router;