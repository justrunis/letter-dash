import express from "express";
import { createUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

// POST /auth/register
router.post("/register", createUser);

// POST /auth/login
router.post("/login", loginUser);

export default router;
