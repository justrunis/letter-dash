import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { connectDB } from "./util/database.js";
import bodyParser from "body-parser";
import cron from "node-cron";
import DailyChallenge from "./models/dailyChallenge.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dailyChallengeRoutes from "./routes/dailyChallengeRoutes.js";
import guessRoutes from "./routes/guessRoutes.js";

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

async function createDailyChallenges() {
  try {
    const URL = "https://random-word-api.vercel.app/api?words=30&length=5";
    const response = await fetch(URL);
    const words = await response.json();

    if (!Array.isArray(words) || words.length !== 30) {
      throw new Error("Failed to fetch 30 words.");
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i <= 30; i++) {
      const challengeDate = new Date(today);
      challengeDate.setDate(today.getDate() + i);

      const existingChallenge = await DailyChallenge.findOne({
        date: challengeDate,
      });
      if (existingChallenge) {
        console.log(
          `Daily challenge for ${
            challengeDate.toISOString().split("T")[0]
          } already exists.`
        );
        console.log("The word is: " + existingChallenge.word);
        continue;
      }

      const dailyWord = words[i - 1].toLowerCase();
      const dailyChallenge = new DailyChallenge({
        date: challengeDate,
        word: dailyWord,
      });
      await dailyChallenge.save();

      console.log(
        `The daily word for ${
          challengeDate.toISOString().split("T")[0]
        } is: ${dailyWord}`
      );
    }
  } catch (error) {
    console.error("Error creating daily challenges:", error);
  }
}

createDailyChallenges();
// Schedule the cron job to run daily at midnight
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
