import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testDBConnection, sequelize } from "./db.js";
import journalRoutes from "./routes/journalRoutes.js";

dotenv.config();
console.log("Loaded API Key:", process.env.GEMINI_API_KEY ? "✅ Found" : "❌ Missing");


const app = express();
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

// routes
app.use("/api/journal", journalRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    await testDBConnection();
    await sequelize.sync({ alter: true }); // sync models to DB
    console.log("✅ Models synced with MySQL");
  });
