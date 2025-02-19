import express from "express";
import { getUsersProfile } from "../controllers/leaderboardController.js";
import { isAuth } from "../middleware/is-auth.js";

const router = express.Router();

// GET /leaderboard/profile
router.get("/profile", isAuth, getUsersProfile);

export default router;
