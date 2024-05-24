import express from 'express';
import { createVault, getVaultByQuestId, updateVaultBalance} from './vaultController.js';
import { protectRoutes } from '../middlewares/authenticationMiddleware.js';

const router = express.Router();

router.post('/vaults/createVault', protectRoutes, createVault);
router.get('/vaults/getVault/:questId', protectRoutes, getVaultByQuestId);
router.put('/vaults/updateVault/:questId', protectRoutes, updateVaultBalance);

export default router;