// models/index.js
import { sequelize } from "../db.js";
import { User } from "./User.js";
import { JournalEntry } from "./JournalEntry.js";

// ✅ Define associations here
User.hasMany(JournalEntry, { foreignKey: "userId", onDelete: "CASCADE" });
JournalEntry.belongsTo(User, { foreignKey: "userId" });

export { User, JournalEntry, sequelize };
