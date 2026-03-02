import connectToGeminiToPdf from "@/shared/infra/llm/gemini.connection";
import { InvoicesRepository } from "../repositories/InvoicesRepository";
import { CustomersRepository } from "../repositories/CustomersRepository";

export class UploadInvoiceService {
  private invoicesRepository = new InvoicesRepository();
  private customersRepository = new CustomersRepository();
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

     let customer =
      await this.customersRepository.findByClientNumber(
        invoiceData.num_cliente
      );

    // ✅ CRIA SE NÃO EXISTIR
    if (!customer) {
      customer =
        await this.customersRepository.create({
          clientNumber: invoiceData.num_cliente,
          installationNumber: invoiceData.num_instalacao
        });
    }

    // ✅ SALVA FATURA
    const invoice =
      await this.invoicesRepository.create({
        referenceMonth: invoiceData.mes_referencia,
        dueDate: invoiceData.vencimento,
        totalValue: invoiceData.valor_total,

        energyKwh:
          invoiceData.itens.energia_eletrica_kwh,

        compensatedEnergyKwh:
          invoiceData.itens.energia_compensada_kwh,

        publicLightingContribution:
          invoiceData.itens.contrib_ilum_publica,

        customer
      });

    return invoice;
  }
}
