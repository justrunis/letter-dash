import express from "express";
import { getDailyChallenge } from "../controllers/dailyChallenge.js";
import { isAuth } from "../middleware/is-auth.js";

const router = express.Router();

// GET /daily-challenge
router.get("/", isAuth, getDailyChallenge);

export default router;
