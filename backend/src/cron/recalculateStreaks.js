import mongoose from "mongoose";
import User from "../models/user.js";
import Guess from "../models/guess.js";

export async function recalculateStreaks() {
  try {
    const allUsers = await User.find();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updatePromises = allUsers.map(async (user) => {
      const lastCorrectGuess = await Guess.findOne({
        userId: new mongoose.Types.ObjectId(user.id),
        isCorrect: true,
      })
        .sort({ createdAt: -1 })
        .limit(1);

      if (!lastCorrectGuess) {
        return; // No correct guess found, skip updating this user
      }

      const lastGuessDate = new Date(lastCorrectGuess.createdAt);
      lastGuessDate.setHours(0, 0, 0, 0);

      const dayDifference = Math.floor(
        (today.getTime() - lastGuessDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (dayDifference > 1) {
        user.dayStreak = 0;
        await user.save();
      }
      console.log(`Day streak for user ${user.username}: ${user.dayStreak}`);
    });

    await Promise.all(updatePromises); // Execute updates in parallel
  } catch (error) {
    console.error("Error clearing users streaks:", error);
  }
}
