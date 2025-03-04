import express from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { isAuth } from "../middleware/is-auth.js";

const router = express.Router();

// GET /user/profile
router.get("/profile", isAuth, getUserProfile);

// PATCH /user/update
router.patch("/update", isAuth, updateUserProfile);

export default router;
