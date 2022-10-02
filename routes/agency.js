import express from 'express';

import { createAgency, getMaxTotalBillData, updateClient } from '../controllers/agencyAndClient';
import { verifyUser } from '../middleware/auth_check';

const router = express.Router();

router.post('/create-agency',verifyUser, createAgency);
router.put('/update-client',verifyUser, updateClient);
router.get('/max-total-bill',verifyUser,getMaxTotalBillData);

export default router;
