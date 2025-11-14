import { JournalEntry } from "../models/JournalEntry.js";
import { analyzeMood } from "../services/journalService.js";
import db from "../db.js";

// DELETE journal entry by ID
export const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deleted = await JournalEntry.destroy({
      where: { id, userId }, // ✅ only delete if owned by user
    });

    if (deleted === 0) {
      return res.status(404).json({ message: "Entry not found or unauthorized" });
    }

    res.json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ error: "Failed to delete entry" });
  }
};

// POST - add entry
export const addEntry = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "Text required" });

  const aiData = await analyzeMood(text);

  try {
    const newEntry = await JournalEntry.create({
      text,
      mood: aiData.mood,
      suggestion: aiData.suggestion,
      userId: req.user.id, // ✅ link to logged-in user
    });
    return res.json(newEntry);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "DB error" });
  }
};

// GET - fetch all entries
export const getAllEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });
    return res.json(entries);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "DB error" });
  }
};
