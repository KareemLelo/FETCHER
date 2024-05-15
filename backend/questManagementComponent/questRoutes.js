import express from 'express';
import { createQuest, getAvailableQuests, getQuestByCreator,  getQuestByAcceptor, updateQuestIndices, getQuestByCreatorTrackOrder } from './questController.js';
import { protectRoutes } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Create a new quest
router.post('/postQuest', protectRoutes, createQuest);

router.get('/quests', getAvailableQuests);
router.get('/questsByCreator', protectRoutes, getQuestByCreator);
router.get('/questsByCreatorTrackOrder',protectRoutes,getQuestByCreatorTrackOrder);
router.get('/questsByAcceptedBy/:acceptedById', protectRoutes, getQuestByAcceptor);
router.put('/updateQuest/:questId', protectRoutes, updateQuestIndices);

export default router;