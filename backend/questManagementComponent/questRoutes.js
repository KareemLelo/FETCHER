import express from 'express';
import { createQuest, acceptQuest, getAvailableQuests, fetchQuestByCreator } from './questController.js';
import { protectRoutes } from '../middlewares/authMiddleware.js'; // if you want to protect the route

const router = express.Router();

// Create a new quest
//router.post('/', protectRoutes, createQuest);
router.post('/postQuest', protectRoutes, createQuest);

//router.post('/accept/:questId', protectRoutes, acceptQuest);
router.post('/accept/:questId', acceptQuest);

router.get('/quests', getAvailableQuests);
router.get('/questsByCreator', protectRoutes, fetchQuestByCreator);

export default router;