import Guess from "../models/guess.js";
import User from "../models/user.js";
import DailyChallenge from "../models/dailyChallenge.js";
import mongoose from "mongoose";

export const submitGuess = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { word } = req.body;

    if (!word || typeof word !== "string") {
      return res.status(400).json({ message: "Invalid word input." });
    }

    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);

    const dailyChallenge = await DailyChallenge.findOne({ date: today });
    if (!dailyChallenge) {
      return res
        .status(404)
        .json({ message: "No daily challenge found for today." });
    }

    const isCorrect = dailyChallenge.word.toLowerCase() === word.toLowerCase();

    const newGuess = new Guess({
      userId: new mongoose.Types.ObjectId(userId),
      challengeId: dailyChallenge._id,
      word: word.toLowerCase(),
      isCorrect,
    });

    await newGuess.save();

    if (isCorrect) {
      const user = await User.findById(userId);

      if (user) {
        const lastCorrectGuess = await Guess.findOne({
          userId: new mongoose.Types.ObjectId(userId),
          isCorrect: true,
        })
          .sort({ createdAt: -1 })
          .limit(1);

        let updatedStreak = 1;

        if (lastCorrectGuess) {
          const lastGuessDate = new Date(lastCorrectGuess.createdAt);
          lastGuessDate.setHours(0, 0, 0, 0);

          const dayDifference = (today - lastGuessDate) / (1000 * 60 * 60 * 24);

          if (dayDifference === 1) {
            updatedStreak = user.dayStreak + 1;
          } else if (dayDifference > 1) {
            updatedStreak = 1;
          }
        }

        user.dayStreak = updatedStreak;
        await user.save();
      }
    }

    res.status(201).json({
      message: "Guess submitted successfully.",
      guess: newGuess,
    });
  } catch (error) {
    console.error("Error submitting guess:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getTodaysGuesses = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    today.setDate(today.getDate() + 1);
    today.setHours(0, 0, 0, 0);

    const dailyChallenge = await DailyChallenge.findOne({ date: today });
    if (!dailyChallenge) {
      return res
        .status(404)
        .json({ message: "No daily challenge found for today." });
    }

    const guesses = await Guess.find({
      userId: new mongoose.Types.ObjectId(userId),
      challengeId: dailyChallenge._id,
    }).sort({ createdAt: 1 }); // Sort by creation time

    res.status(200).json({ guesses });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
