import express from 'express';

import { createAgency, getMaxTotalBillData, updateClient } from '../controllers/agencyAndClient';

const router = express.Router();

router.post('/create-agency', createAgency);
router.put('/update-client', updateClient);
router.get('/max-total-bill',getMaxTotalBillData);

export default router;
