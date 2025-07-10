import express from 'express';
import { sendMessage } from '../controllers/chatController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/send', upload.single('file'), sendMessage);

export default router;
