import "reflect-metadata";
import { DataSource } from "typeorm";
import { Invoice } from "@/modules/invoices/entities/InVoice";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "suasenha",
  database: process.env.DB_NAME || "leitor_energia",
  synchronize: true,
  logging: true,
  entities: [Invoice],
  subscribers: [],
  migrations: [],
});