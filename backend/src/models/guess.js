import mongoose from "mongoose";

const { Schema } = mongoose;

const guessSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challengeId: {
      type: Schema.Types.ObjectId,
      ref: "DailyChallenge",
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    timeTaken: {
      type: Number,
      default: 0,
    },
    attemptsTaken: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Guess", guessSchema);
