import { z } from "zod";

export const createPalletGroupSchema = z.object({
  title: z.string().min(1, "Назва обов'язкова").max(128, "Назва занадто довга"),
  order: z
    .number({
      required_error: "Порядок обов'язковий",
      invalid_type_error: "Порядок має бути числом",
    })
    .int("Порядок має бути цілим числом")
    .positive("Порядок має бути додатним"),
});

export type CreatePalletGroupFormValues = z.infer<
  typeof createPalletGroupSchema
>;
