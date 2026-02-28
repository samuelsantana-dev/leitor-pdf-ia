export interface IEnergyInvoice {
  num_cliente: string;
  num_instalacao: string;
  mes_referencia: string;
  vencimento: string;
  valor_total: number;
  itens: {
    energia_eletrica_kwh: number;
    energia_compensada_kwh: number;
    contrib_ilum_publica: number;
  };
  outputText?: string;
}