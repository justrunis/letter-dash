import Guess from "../models/guess.js";
import User from "../models/user.js";
import mongoose from "mongoose";

export const getUserProfile = async (req, res, next) => {
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

export const getUsers = async (req, res, next) => {
  try {
    let users = await User.find().select("-password");

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "Users not found." });
    }

    users = users.sort((a, b) => b.dayStreak - a.dayStreak);

    users = users.slice(0, 10);

    res.status(200).json({ users });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getUserDayStreak = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password");

    const guesses = await Guess.find({
      userId: new mongoose.Types.ObjectId(userId),
      isCorrect: true,
    }).sort({ createdAt: 1 });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ dayStreak: user.dayStreak });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getLeaderboard = async (req, res, next) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ dayStreak: -1 })
      .limit(10);
    res.status(200).json({ users });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
