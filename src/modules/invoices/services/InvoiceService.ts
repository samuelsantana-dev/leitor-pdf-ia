import connectToGeminiToPdf from "@/shared/infra/llm/gemini.connection";
import { IEnergyInvoice } from "../types/indext";

export class UploadInvoiceService {
  async execute(fileBuffer: any): Promise<any> {

    if (!fileBuffer) {
      throw new Error("Nenhum arquivo enviado");
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error("O buffer do arquivo está vazio. Verifique a configuração do Multer.");
    }

    if (fileBuffer.length < 1000) {
      throw new Error("O arquivo enviado é muito pequeno para ser um PDF válido. Verifique se selecionou o arquivo corretamente no Postman.");
    }

    if (!fileBuffer || fileBuffer.length === 0) {
      throw new Error("Arquivo PDF vazio");
    }

      const base64Pdf = Buffer.from(fileBuffer).toString("base64");

    const invoiceData = await connectToGeminiToPdf(base64Pdf);

    return invoiceData;
  }
}
