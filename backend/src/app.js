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

async function createDailyChallenge() {
  try {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);

    const URL = "https://random-word-api.vercel.app/api?words=1&length=5";
    const response = await fetch(URL);
    const data = await response.json();
    const dailyWord = data[0].toLowerCase();

    const existingChallenge = await DailyChallenge.findOne({ date: date });
    if (existingChallenge) {
      console.log(
        `Daily challenge for ${
          date.toISOString().split("T")[0]
        } already exists.`
      );
      console.log("The word is: " + existingChallenge.word);
      return;
    }

    const dailyChallenge = new DailyChallenge({ date: date, word: dailyWord });
    await dailyChallenge.save();

    console.log(
      `The daily word for ${date.toISOString().split("T")[0]} is: ${dailyWord}`
    );
  } catch (error) {
    console.error("Error creating daily challenge:", error);
  }
}

createDailyChallenge();
// Schedule the cron job to run daily at midnight
cron.schedule("0 0 * * *", createDailyChallenge);

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
