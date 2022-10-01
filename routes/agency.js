import express from 'express';

import { createAgency } from '../controllers/agencyAndClient';

const router = express.Router();

router.post('/create-agency', createAgency);

export default router;
