const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { deleteChannel } = require('./channelController');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, avatar } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }

    const user = new User({
      username,
      email,
      password,
      avatar,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.fetchUserDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.editUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, avatar } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (username) user.username = username;

    if (avatar) user.avatar = avatar;

    const updatedUser = await user.save();

    res.status(200).json({
      message: "User details updated successfully.",
      user: { id: updatedUser._id, username: updatedUser.username, email: updatedUser.email, avatar: updatedUser.avatar },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const channelId = user.channelId;

    if (channelId) {
      await deleteChannel({ params: { id: channelId }, user: req.user });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User and associated channel deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

