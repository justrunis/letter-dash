import express from "express";
import {
  getUserProfile,
  getLeaderboard,
  getUserDayStreak,
  getUsers,
} from "../controllers/leaderboardController.js";
import { isAuth } from "../middleware/is-auth.js";

const router = express.Router();

// GET /leaderboard/profile
router.get("/profile", isAuth, getUserProfile);

// GET /leaderboard/profile/:userId
router.get("/profile/:userId", getUserDayStreak);

// GET /leaderboard
router.get("/", getLeaderboard);

export default router;
