import { z } from "zod";

export const rowSchema = z.object({
  title: z
    .string()
    .min(1, "Назва ряду обов'язкова")
    .max(50, "Назва ряду не може перевищувати 50 символів")
    .trim(),
});

export type RowFormValues = z.infer<typeof rowSchema>;

