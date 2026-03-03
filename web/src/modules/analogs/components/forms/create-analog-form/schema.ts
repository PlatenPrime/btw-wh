import { z } from "zod";

export const createAnalogFormSchema = z
  .object({
    konkName: z.string().min(1, "Оберіть конкурента"),
    prodName: z.string().min(1, "Оберіть виробника"),
    url: z.string().url("Введіть коректне посилання").min(1, "Посилання обов'язкове"),
    artikul: z
      .string()
      .min(1, "Артикул обов'язковий"),
  });

/** Explicit type so form/resolver get consistent artikul: string (schema uses .default("")) */
export type CreateAnalogFormData = {
  konkName: string;
  prodName: string;
  url: string;
  artikul: string;
};

export const createAnalogFormDefaultValues: CreateAnalogFormData = {
  konkName: "",
  prodName: "",
  url: "",
  artikul: "",
};
