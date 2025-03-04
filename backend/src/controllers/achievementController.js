import Achievement from "../models/achievement.js";

export const getAchievements = async (req, res, next) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).json(achievements);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const getAchievement = async (req, res, next) => {
  try {
    const achievementId = req.params.achievementId;
    const achievement = await Achievement.findById(achievementId);
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found." });
    }
    res.status(200).json(achievement);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
