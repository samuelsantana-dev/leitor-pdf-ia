import { Request, Response } from "express";
import { UploadInvoiceService } from "../services/InvoiceService";
const service = new UploadInvoiceService();
export class UploadInvoiceController {
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const output = await service.execute(req.file?.buffer);

      return res.json({
        success: true,
        data: output,
      });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
