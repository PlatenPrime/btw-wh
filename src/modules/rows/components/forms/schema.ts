import { z } from "zod";

// Zod schema for row forms
export const rowSchema = z.object({
  title: z
    .string()
    .min(2, "Назва ряду має бути мінімум 2 символи")
    .max(10, "Назва ряду має бути максимум 10 символів"),
});

export type RowFormValues = z.infer<typeof rowSchema>;
