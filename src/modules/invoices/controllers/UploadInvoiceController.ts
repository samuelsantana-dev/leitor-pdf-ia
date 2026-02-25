import { Request, Response } from "express";
import { UploadInvoiceService } from "../services/UploadInvoiceService";

export class UploadInvoiceController {
  async handle(req: Request, res: Response): Promise<Response> {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "Arquivo PDF não enviado" });
    }

    
    const uploadService = new UploadInvoiceService();
    const result = await uploadService.execute(file);

    return res.status(201).json(result);
  }
}