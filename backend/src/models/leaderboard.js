import mongoose from "mongoose";

const { Schema } = mongoose;

const leaderboardSchema = new Schema(
  {
    period: {
      type: String,
      required: true,
      enum: ["daily", "weekly", "monthly", "all-time"],
    },
    date: {
      type: Date,
      required: true,
    },
    topPlayers: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        username: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Leaderboard", leaderboardSchema);
