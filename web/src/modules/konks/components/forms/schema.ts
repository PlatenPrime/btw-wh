import { z } from "zod";

const nameSchema = z
  .string()
  .min(1, "Ключ (name) обовʼязковий")
  .regex(/^\S+$/, "Ключ має бути одним словом (без пробілів)");
const recountDaySchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Некоректний формат дати переобліку");

export const createKonkSchema = z.object({
  name: nameSchema,
  title: z.string().min(1, "Назва обовʼязкова"),
  url: z.string().url("Введіть коректний URL сайту"),
  imageUrl: z.string().url("Введіть коректний URL зображення"),
});

export const updateKonkSchema = z.object({
  name: nameSchema.optional(),
  title: z.string().min(1, "Назва обовʼязкова").optional(),
  url: z.string().url("Введіть коректний URL сайту").optional(),
  imageUrl: z.string().url("Введіть коректний URL зображення").optional(),
  recountDays: z.array(recountDaySchema).optional(),
});

export type CreateKonkFormValues = z.infer<typeof createKonkSchema>;
export type UpdateKonkFormValues = z.infer<typeof updateKonkSchema>;

export const createKonkDefaultValues: CreateKonkFormValues = {
  name: "",
  title: "",
  url: "",
  imageUrl: "",
};

export const updateKonkDefaultValues: UpdateKonkFormValues = {
  recountDays: [],
};
