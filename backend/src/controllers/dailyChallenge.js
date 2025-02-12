import DailyChallenge from "../models/dailyChallenge.js";

export const getDailyChallenge = async (req, res) => {
  try {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(0, 0, 0, 0);
    const dailyChallenge = await DailyChallenge.findOne({ date: date });
    if (!dailyChallenge) {
      return res.status(404).json({ message: "Daily challenge not found." });
    }
    res.status(200).json(dailyChallenge);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
