import { z } from "zod";

export const createPalletGroupSchema = z.object({
  title: z.string().min(1, "Назва обов'язкова").max(128, "Назва занадто довга"),
  // Строка mid-edit (без parseInt на keystroke); число парсим на submit
  order: z
    .string()
    .min(1, "Порядок обов'язковий")
    .regex(/^\d+$/, "Порядок має бути числом")
    .refine(
      (value) => Number.parseInt(value.replace(/^0+/, "") || "0", 10) > 0,
      "Порядок має бути додатним цілим числом",
    ),
});

export type CreatePalletGroupFormValues = z.infer<
  typeof createPalletGroupSchema
>;

export function parsePalletGroupOrder(value: string): number {
  return Number.parseInt(value.replace(/^0+/, "") || "0", 10);
}
