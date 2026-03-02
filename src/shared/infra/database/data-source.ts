import "reflect-metadata";
import { DataSource } from "typeorm";
import { Invoice } from "@/modules/invoices/entities/InVoice";
import dotenv from "dotenv";
import { Customer } from "@/modules/invoices/entities/Customer";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASS || "suasenha",
  database: process.env.DB_NAME || "energy_db",
  synchronize: true,
  logging: true,
  entities: [Invoice, Customer],
  subscribers: [],
  migrations: [],
});