import { z } from "zod";

export const createAnalogFormSchema = z
  .object({
    konkName: z.string().min(1, "Оберіть конкурента"),
    prodName: z.string().min(1, "Оберіть виробника"),
    url: z.string().url("Введіть коректне посилання").min(1, "Посилання обов'язкове"),
    artikul: z.string().default(""),
    title: z.string().optional(),
    imageUrl: z.string().optional(),
  })
  .refine(
    (data) => {
      const hasArtikul = Boolean(data.artikul?.trim());
      if (hasArtikul) return true;
      const hasTitle = Boolean(data.title?.trim());
      const hasImageUrl = Boolean(data.imageUrl?.trim());
      return hasTitle && hasImageUrl;
    },
    {
      message:
        "Якщо артикул не вказано, заповніть назву та посилання на зображення",
      path: ["title"],
    },
  )
  .refine(
    (data) => {
      if (!data.imageUrl?.trim()) return true;
      try {
        new URL(data.imageUrl);
        return true;
      } catch {
        return false;
      }
    },
    { message: "Введіть коректне посилання на зображення", path: ["imageUrl"] },
  );

/** Explicit type so form/resolver get consistent artikul: string (schema uses .default("")) */
export type CreateAnalogFormData = {
  konkName: string;
  prodName: string;
  url: string;
  artikul: string;
  title?: string;
  imageUrl?: string;
};

export const createAnalogFormDefaultValues: CreateAnalogFormData = {
  konkName: "",
  prodName: "",
  url: "",
  artikul: "",
  title: "",
  imageUrl: "",
};
