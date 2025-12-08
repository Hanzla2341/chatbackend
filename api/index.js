import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from '../config/db.js';
import chatbotmessege from '../routes/chatbot.route.js';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

// Connect only once
let isConnected = false;

async function ensureDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

app.use(async (req, res, next) => {
  try {
    await ensureDB();
    next();
  } catch (err) {
    console.error('DB Error:', err);
    return res.status(500).json({ message: 'Database connection failed' });
  }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Chatbot backend running ✔'));
app.use('/bot/v1', chatbotmessege);

export default serverless(app);
