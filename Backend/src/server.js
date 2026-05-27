import dotenv from "dotenv";
import app from "./app.js";
import { connectDatabase } from "./config/database.js";
import { validateEnv } from "./config/env.js";

dotenv.config();

const startServer = async () => {
  try {
    validateEnv();
    await connectDatabase();

    const port = Number(process.env.PORT || 5000);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
