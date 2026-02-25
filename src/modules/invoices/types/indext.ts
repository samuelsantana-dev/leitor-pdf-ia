export interface ExtractedInvoiceDTO {
  clientNumber: string;
  referenceMonth: string;
  electricEnergy: {
    kwh: number;
    amount: number;
  };
  sceeeEnergy: {
    kwh: number;
    amount: number;
  };
  compensatedEnergy: {
    kwh: number;
    amount: number;
  };
  publicLightingContribution: {
    amount: number;
  };
}