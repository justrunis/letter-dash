import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { connectDB } from "./util/database.js";
import bodyParser from "body-parser";
import cron from "node-cron";
import { createDailyChallenges } from "./cron/createDailyChallenges.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dailyChallengeRoutes from "./routes/dailyChallengeRoutes.js";
import guessRoutes from "./routes/guessRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/daily-challenge", dailyChallengeRoutes);
app.use("/guess", guessRoutes);
app.use("/leaderboard", leaderboardRoutes);

// Schedule the cron job to run daily
createDailyChallenges();
cron.schedule("0 0 * * *", createDailyChallenges);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message });
});

connectDB().then(async () => {
  app.listen(port, () => {
    console.log("Server is running on port " + port);
  });
});
