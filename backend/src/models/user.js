import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    totalScore: {
      type: Number,
      default: 0,
    },
    dayStreak: {
      type: Number,
      default: 0,
    },
    achievements: [
      {
        achievementId: {
          type: Schema.Types.ObjectId,
          ref: "Achievement",
        },
        dateUnlocked: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
