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
              text: `Analise esta fatura de energia CEMIG e extraia os dados em um JSON estrito com este formato:
              {
                "num_cliente": "string",
                "num_instalacao": "string",
                "mes_referencia": "string",
                "vencimento": "string",
                "valor_total": number,
                "itens": {
                  "energia_eletrica_kwh": number,
                  "energia_compensada_kwh": number,
                  "contrib_ilum_publica": number
                }
              `,
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
