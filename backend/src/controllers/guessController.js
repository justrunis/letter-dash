import Guess from "../models/guess.js";
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

    const isCorrect = dailyChallenge.word === word.toLowerCase();

    const newGuess = new Guess({
      userId: new mongoose.Types.ObjectId(userId),
      challengeId: dailyChallenge._id,
      word: word.toLowerCase(),
      isCorrect,
    });

    await newGuess.save();

    res
      .status(201)
      .json({ message: "Guess submitted successfully.", guess: newGuess });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
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
