import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const saltRounds = 12;
const tokenExpiryTime = "7d";

export const createUser = async (req, res, next) => {
  try {
    const { username, email, password, passwordRepeat } = req.body;

    if (!username || !email || !password || !passwordRepeat) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== passwordRepeat) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists." });
    }

    const role = "user";
    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const passwordMatch = await bcryptjs.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: tokenExpiryTime }
    );

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error logging in user:", error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const passwordResetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    user.resetToken = passwordResetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // 1 hour

    await user.save();

    res.status(200).json({ message: "Password reset token sent." });
  } catch (error) {
    console.error("Error sending password reset token:", error);
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, password, passwordRepeat } = req.body;

    if (!token || !password || !passwordRepeat) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password !== passwordRepeat) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    const hashedPassword = await bcryptjs.hash(password, saltRounds);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;

    await user.save();

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const err = new Error("Password reset token has expired.");
      err.statusCode = 400;
      next(err);
    } else if (error.name === "JsonWebTokenError") {
      const err = new Error("Invalid token.");
      err.statusCode = 400;
      next(err);
    } else {
      console.error("Error in resetPassword:", error);
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    }
  }
};

export const logoutUser = async () => {
  res.status(200).json({ message: "Logout successful!" });
};
