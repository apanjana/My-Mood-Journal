// db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    logging: false,
  }
);

export const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL connection established.");
  } catch (error) {
    console.error("❌ Unable to connect to MySQL:", error);
  }
};


export default sequelize;
