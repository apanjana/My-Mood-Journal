import express from "express";
import {
  addEntry,
  getAllEntries,
  deleteEntry,
} from "../controllers/journalController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, addEntry); // POST route
router.get("/all", verifyToken, getAllEntries); // GET route
router.delete("/delete/:id", verifyToken, deleteEntry); // DELETE route

export default router;
