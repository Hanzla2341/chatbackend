import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from "./config/db.js";
import chatbotmessege from "./routes/chatbot.route.js"
import ServerlessHttp from 'serverless-http';


const app = express()
dotenv.config()
// Lazy DB connection (ensures it connects only when needed)
app.use(async (req, res, next) => {
  if (!global.dbConnected) {
    try {
      await connectDB();
      global.dbConnected = true;
    } catch (err) {
      console.error("DB Connection Error:", err.message);
      return res.status(500).json({ message: "Database connection failed" });
    }
  }
  next();
});

app.get('/', (req, res) => res.send("Hello chatbot run!"));

// middleware
app.use(express.json());
app.use(cors())



// Defining Routes
// Defining Routes
app.use("/bot/v1/",chatbotmessege )


module.exports = app;
module.exports.handler = ServerlessHttp(app);