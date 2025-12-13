const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db.js');
const chatbotmessege = require('./routes/chatbot.route.js');

dotenv.config();

const app = express();

// 🔥 Connect DB ONCE at startup
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Chatbot backend running ✔'));
app.use('/api', chatbotmessege);

// Start server
module.exports=app;
