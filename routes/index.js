import express from 'express';
import auth from '../utils/auth';
import { getStatus, getStats } from '../controllers/AppController';
import { postNew, getMe } from '../controllers/UsersController';
import { getConnect, getDisconnect } from '../controllers/AuthController';
import { postUpload } from '../controllers/FilesController';

const router = express.Router();
const status = getStatus;
const stats = getStats;
const post = postNew;
const connected = getConnect;
const disconnected = getDisconnect;
const user = getMe;
const upload = postUpload;

router.get('/status', status);
router.get('/stats', stats);
router.post('/users', post);
router.get('/connect', connected);
router.get('/disconnect', auth, disconnected);
router.get('/users/me', auth, user);
router.post('/files', auth, upload);
export default router;
