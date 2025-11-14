import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { JournalEntry } from "../models/JournalEntry.js";

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      name: user.name, // assuming your user model has a 'name' field
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
});

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, name, dob, password } = req.body;

    if (!username || !name || !dob || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username already exists. Please choose another." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      name,
      dob,
      password: hashedPassword,
    });

    // ✅ Generate a JWT token immediately
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully!",
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        dob: user.dob,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
});

// GET PROFILE
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "name", "dob"],
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// UPDATE PROFILE
router.put("/profile/update", verifyToken, async (req, res) => {
  try {
    const { username, name, password } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✓ Check if username already exists
    if (username && username !== user.username) {
      const existing = await User.findOne({ where: { username } });
      if (existing)
        return res.status(400).json({ message: "Username already taken" });

      user.username = username;
    }

    if (name) user.name = name;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
});

// DELETE ACCOUNT
router.delete("/delete-account", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    // Delete journal entries first
    await JournalEntry.destroy({ where: { userId } });

    // Delete user
    await User.destroy({ where: { id: userId } });

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete account" });
  }
});

export default router;
