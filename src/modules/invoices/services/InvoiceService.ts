import { ExtractedInvoiceDTO } from "../types/indext";

export class InvoiceService {
    static async calculate(data: ExtractedInvoiceDTO) {
    const totalConsumptionKwh =
      (data.electricEnergy?.kwh ?? 0) +
      (data.sceeeEnergy?.kwh ?? 0);

    const totalAmountWithoutGD =
      (data.electricEnergy?.amount ?? 0) +
      (data.sceeeEnergy?.amount ?? 0) +
      (data.publicLightingContribution?.amount ?? 0);

    const gdSavingsAmount =
      data.compensatedEnergy?.amount ?? 0;

    const compensatedEnergyKwh =
      data.compensatedEnergy?.kwh ?? 0;

    return {
      totalConsumptionKwh,
      totalAmountWithoutGD,
      gdSavingsAmount,
      compensatedEnergyKwh,
    };
  }
}