import express from 'express';
import { createVault, getVaultById, updateVault} from './vaultController.js';
import { protectRoutes } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/vaults/createVault', protectRoutes, createVault);
router.get('/vaults/getVault/:id', protectRoutes, getVaultById);
router.put('/vaults/updateVault/:id', protectRoutes, updateVault);

export default router;
