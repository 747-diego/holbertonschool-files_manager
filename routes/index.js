import express from 'express';
import { getStatus, getStats } from '../controllers/AppController';
import { postNew } from '../controllers/UsersController';

const post = postNew;
const status = getStatus;
const stats = getStats;
const router = express.Router();
router.get('/status', status);
router.get('/stats', stats);
router.post('/users', post);

export default router;
