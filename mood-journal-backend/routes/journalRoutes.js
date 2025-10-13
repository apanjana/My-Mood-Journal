import express from "express";
import { addEntry, getAllEntries, deleteEntry } from "../controllers/journalController.js";

const router = express.Router();

router.post("/add", addEntry);        // POST route
router.get("/all", getAllEntries);    // GET route
router.delete("/delete/:id", deleteEntry); // DELETE route

export default router;
