import express from "express";
import {
  getTodaysGuesses,
  submitGuess,
} from "../controllers/guessController.js";
import { isAuth } from "../middleware/is-auth.js";

const router = express.Router();

// GET /guesses
router.get("/", isAuth, getTodaysGuesses);

// POST /guess
router.post("/", isAuth, submitGuess);

export default router;
