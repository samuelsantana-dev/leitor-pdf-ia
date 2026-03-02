export interface ExtractedInvoiceDTO {
  numero_cliente: string;
  mes_referencia: string;
  energia_eletrica: {
    kwh: number;
    valor: number;
  };
}