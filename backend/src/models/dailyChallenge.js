import mongoose from "mongoose";

const { Schema } = mongoose;

const dailyChallengeSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    word: {
      type: String,
      required: true,
      trim: true,
    },
    hints: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("DailyChallenge", dailyChallengeSchema);
