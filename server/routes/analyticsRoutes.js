import express from 'express';
import { 
    getAllStats, 
    returnMonthlyRevenue, 
    returnOrderStatusDistribution 
} from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/all', getAllStats);
router.get('/status-distribution', returnOrderStatusDistribution);
router.get('/revenues', returnMonthlyRevenue);

export default router