import express from "express";
import {
  getAchievements,
  getAchievement,
} from "../controllers/achievementController.js";

const router = express.Router();

// GET /achievement
router.get("/", getAchievements);

// GET /achievement/:achievementId
router.get("/:achievementId", getAchievement);

export default router;
