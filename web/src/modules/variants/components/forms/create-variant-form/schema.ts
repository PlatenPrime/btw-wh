import { z } from "zod";

export const createVariantFormSchema = z.object({
  konkName: z.string().min(1, "Оберіть конкурента"),
  prodName: z.string().min(1, "Оберіть виробника"),
  title: z.string().min(1, "Назва варіанта обов'язкова"),
  url: z
    .string()
    .url("Введіть коректне посилання")
    .min(1, "Посилання обов'язкове"),
  imageUrl: z
    .string()
    .url("Введіть коректне посилання на зображення")
    .min(1, "Зображення обов'язкове"),
});

export type CreateVariantFormData = z.infer<typeof createVariantFormSchema>;

export const createVariantFormDefaultValues: CreateVariantFormData = {
  konkName: "",
  prodName: "",
  title: "",
  url: "",
  imageUrl: "",
};

