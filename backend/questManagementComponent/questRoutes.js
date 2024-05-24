import express from 'express';
import { createQuest, getAvailableQuests, getQuestByCreator, getAllQuestsByCreator, getQuestByAcceptor, getAllQuestsByAcceptor, updateQuestIndices, getQuestByCreatorTrackOrder, updateCanceledBy } from './questController.js';
import validateCreateQuest from '../middlewares/validateCreateQuestMiddleware.js';
import { protectRoutes } from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.post('/postQuest', protectRoutes, validateCreateQuest,createQuest);
router.get('/quests', protectRoutes,getAvailableQuests);
router.get('/questsByCreator', protectRoutes, getQuestByCreator);
router.get('/allQuestsByCreator', protectRoutes, getAllQuestsByCreator);
router.get('/questsByCreatorTrackOrder',protectRoutes,getQuestByCreatorTrackOrder);
router.get('/questsByAcceptedBy', protectRoutes, getQuestByAcceptor);
router.get('/allQuestsByAcceptor', protectRoutes, getAllQuestsByAcceptor); 
router.put('/updateQuest/:questId', protectRoutes, updateQuestIndices);
router.put('/quest/cancel/:questId', protectRoutes, updateCanceledBy);

export default router;