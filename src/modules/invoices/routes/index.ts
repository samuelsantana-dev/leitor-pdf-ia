import { Router } from "express";
import { UploadInvoiceController } from "../controllers/UploadInvoiceController";
import multer from "multer";

export const invoicesRoutes = Router();

const upload = multer({ dest: 'uploads/' });
invoicesRoutes.post("/upload", upload.any(), new UploadInvoiceController().handle);