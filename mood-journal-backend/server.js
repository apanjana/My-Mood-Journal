import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { testDBConnection } from "./db.js";
import { sequelize } from "./models/index.js"; // ✅ only this one import
import authRoutes from "./routes/authRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/journal", journalRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await testDBConnection();
  await sequelize.sync({ alter: true }); // ✅ sync after associations load
  console.log(`🚀 Server running on port ${PORT}`);
});
