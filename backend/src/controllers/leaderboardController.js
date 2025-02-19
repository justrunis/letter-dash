import Guess from "../models/guess.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const getUsersProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const guesses = await Guess.find({
      userId: new mongoose.Types.ObjectId(userId),
      isCorrect: true,
    }).sort({ createdAt: 1 });

    let dayStreak = 0;
    let currentStreak = 0;
    let lastDate = null;

    for (let i = 0; i < guesses.length; i++) {
      const guessDate = new Date(guesses[i].createdAt).setHours(0, 0, 0, 0);

      if (lastDate === null) {
        currentStreak = 1;
      } else {
        const dayDifference = (guessDate - lastDate) / (1000 * 60 * 60 * 24);

        if (dayDifference === 1) {
          currentStreak++;
        } else if (dayDifference > 1) {
          currentStreak = 1;
        }
      }

      dayStreak = Math.max(dayStreak, currentStreak);
      lastDate = guessDate;
    }

    user.dayStreak = dayStreak;

    res.status(200).json({ user, dayStreak });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
