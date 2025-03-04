import User from "../models/user.js";

export const getUserProfile = async (req, res) => {
  try {
    const id = req.user?.id;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json(user);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const id = req.user?.id;
    const { username } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser.id !== id) {
      return res.status(400).json({ message: "Username already exists." });
    }
    user.username = username;
    await user.save();
    res.status(200).json({ user, message: "Profile updated successfully." });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
