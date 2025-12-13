const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("../config/db.js");
const chatbotRoutes = require("../routes/chatbot.route.js");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB safely
let isConnected = false;
async function connectOnce() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

// Wrap all requests
app.use(async (req, res, next) => {
  await connectOnce();
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Chatbot backend running ✔");
});

app.use("/api", chatbotRoutes);

module.exports = app;
