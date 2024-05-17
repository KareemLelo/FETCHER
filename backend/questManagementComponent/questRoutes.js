import express from 'express';
import { createQuest, getAvailableQuests, getQuestByCreator,  getQuestByAcceptor, updateQuestIndices, getQuestByCreatorTrackOrder, updateCanceledBy } from './questController.js';
import { protectRoutes } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/postQuest', protectRoutes, createQuest);
router.get('/quests', getAvailableQuests);
router.get('/questsByCreator', protectRoutes, getQuestByCreator);
router.get('/questsByCreatorTrackOrder',protectRoutes,getQuestByCreatorTrackOrder);
router.get('/questsByAcceptedBy', protectRoutes, getQuestByAcceptor);
router.put('/updateQuest/:questId', protectRoutes, updateQuestIndices);
router.put('/quest/cancel/:questId', protectRoutes, updateCanceledBy);

export default router;