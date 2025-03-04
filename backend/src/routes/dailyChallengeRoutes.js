import express from "express";
import {
  getDailyChallenge,
  getAllDailyChallenges,
} from "../controllers/dailyChallenge.js";
import { isAuth } from "../middleware/is-auth.js";

const router = express.Router();

// GET /daily-challenge
router.get("/", isAuth, getDailyChallenge);

// GET /daily-challenge/all
router.get("/all", isAuth, getAllDailyChallenges);

export default router;
