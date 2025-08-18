import { z } from "zod";

// Zod schema for pallet forms
export const palletSchema = z.object({
  title: z
    .string()
    .min(2, "Назва палети має бути мінімум 2 символи")
    .max(20, "Назва палети має бути максимум 20 символів"),
  sector: z.string().optional(),
});

export type PalletFormValues = z.infer<typeof palletSchema>;
