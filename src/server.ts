import { app } from "./app";
import { AppDataSource } from "./shared/infra/database/data-source";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Database connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error("DB Error:", error));