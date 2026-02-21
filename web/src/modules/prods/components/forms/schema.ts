import { z } from "zod";

export const createProdSchema = z.object({
  name: z.string().min(1, "Ключ (name) обовʼязковий"),
  title: z.string().min(1, "Назва обовʼязкова"),
  imageUrl: z.string().url("Введіть коректний URL зображення"),
});

export const updateProdSchema = z.object({
  name: z.string().min(1, "Ключ (name) обовʼязковий").optional(),
  title: z.string().min(1, "Назва обовʼязкова").optional(),
  imageUrl: z.string().url("Введіть коректний URL зображення").optional(),
});

export type CreateProdFormValues = z.infer<typeof createProdSchema>;
export type UpdateProdFormValues = z.infer<typeof updateProdSchema>;

export const createProdDefaultValues: CreateProdFormValues = {
  name: "",
  title: "",
  imageUrl: "",
};

export const updateProdDefaultValues: UpdateProdFormValues = {};
