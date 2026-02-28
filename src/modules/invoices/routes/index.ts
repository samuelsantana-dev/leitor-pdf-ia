import { Router } from "express";
import { UploadInvoiceController } from "../controllers/UploadInvoiceController";
import multer from "multer";

export const invoicesRoutes = Router();

const upload = multer({ storage: multer.memoryStorage() });

invoicesRoutes.post("/upload", upload.single('file'), new UploadInvoiceController().handle);