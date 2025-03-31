import express from 'express';
import { getAllStats, returnOrderStatusDistribution } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/all', getAllStats);
router.get('/status-distribution', returnOrderStatusDistribution);

export default router