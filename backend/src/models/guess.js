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
    word: {
      type: String,
      required: true,
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Guess", guessSchema);
