import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import { isAuth } from "../middleware/is-auth.js";

const router = express.Router();

// GET /user/profile
router.get("/profile", isAuth, getUserProfile);

export default router;
