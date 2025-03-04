import Achievement from "../models/achievement.js";
import Guess from "../models/guess.js";
import User from "../models/user.js";

export const checkAchievements = async (user, newGuess) => {
  const achievements = await Achievement.find();
  const userAchievements = user.achievements.map((ach) =>
    ach.achievementId.toString()
  );

  for (const achievement of achievements) {
    let earned = false;

    switch (achievement.title) {
      case "First Dash":
        // Solve the puzzle for the first time
        if (!userAchievements.includes(achievement._id.toString())) {
          earned = true;
        }
        break;
      case "Quick Thinker":
        // Solving the puzzle under 2 minutes
        if (newGuess.timeTaken <= 120000) {
          earned = true;
        }
        break;
      case "Word Sleuth":
        // No incorrect guesses for this puzzle
        const allUserGuessesForToday = await Guess.find({
          userId: user.id,
          isCorrect: true,
          timestamp: {
            $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        });
        if (allUserGuessesForToday.length === 1) {
          earned = true;
        }
        break;
      case "Daily Dedication":
        // Solve daily puzzle for 30 consecutive days
        if (user.dayStreak >= 30) {
          earned = true;
        }
        break;
      case "Letter Enthusiast":
        // Solve 500 puzzles
        const allCorrectUsersGuesses = await Guess.find({
          userId: user.id,
          isCorrect: true,
        });
        if (allCorrectUsersGuesses.length >= 500) {
          earned = true;
        }
        break;
      case "Streak Master":
        // Achieve a 7-day streak
        if (user.dayStreak >= 7) {
          earned = true;
        }
        break;
      default:
        break;
    }

    // If the user qualifies for the achievement and hasn't earned it yet, add it
    if (earned && !userAchievements.includes(achievement._id.toString())) {
      user.achievements.push({
        achievementId: achievement._id,
        dateUnlocked: new Date(),
      });
    }
  }

  await user.save();
};
