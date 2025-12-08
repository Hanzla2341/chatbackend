import express from 'express';
import { Message } from '../controllers/chatbot.messege.js';

const router = express.Router();

router.post("/message",Message)

export default router;