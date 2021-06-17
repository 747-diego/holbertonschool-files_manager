import express from 'express';
import { getStatus, getStats } from '../controllers/AppController';

const status = getStatus;
const stats = getStats;
const router = express.Router();
router.get('/status', status);
router.get('/stats', stats);

export default router;
