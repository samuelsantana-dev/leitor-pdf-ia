import express from "express";
import cors from "cors";
import { invoicesRoutes } from "./modules/invoices/routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/invoices", invoicesRoutes);

export { app };