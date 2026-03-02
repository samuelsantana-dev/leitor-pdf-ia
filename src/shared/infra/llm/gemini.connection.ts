import "dotenv/config";
import { aiClient } from "../ia/gemini.client";
import { GenerateContentResponse } from "@google/genai";
import { IEnergyInvoice } from "@/modules/invoices/types/indext";

export default async function connectToGeminiToPdf(
  base64Pdf: string,
): Promise<IEnergyInvoice> {
  const result: GenerateContentResponse = await aiClient.models.generateContent(
    {
      model: "gemini-2.5-flash",

      contents: [
        {
          role: "user",
          parts: [
            {
             text: `
                Analise cuidadosamente a fatura de energia elétrica da CEMIG presente neste documento.

                Extraia as seguintes informações e apresente os dados em TEXTO SIMPLES e ORGANIZADO,
                sem retornar JSON e sem usar markdown.

                Retorne exatamente neste formato textual:

                Numero do Cliente: <valor>

                Mes de Referencia: <valor>

                Energia Eletrica:
                - Quantidade (kWh): <valor>
                - Valor (R$): <valor>

                Energia SCEEE s/ ICMS:
                - Quantidade (kWh): <valor>
                - Valor (R$): <valor>

                Energia Compensada GD I:
                - Quantidade (kWh): <valor>
                - Valor (R$): <valor>

                Contrib Ilum Publica Municipal:
                - Valor (R$): <valor>

                REGRAS:
                - Extraia apenas valores presentes na fatura.
                - Não invente dados.
                - Caso algum campo não exista, retornar 0.
                - Não adicionar explicações.
                - Não retornar JSON.
                `
            },
            {
              inlineData: {
                data: base64Pdf,
                mimeType: "application/pdf",
              },
            },
          ],
        },
      ],

      generationConfig: {
        responseMimeType: "application/json",
      },
    },
  );

  const output =
    result.text ||
    (result.response && result.response.text ? result.response.text() : result);
  return output;
}
