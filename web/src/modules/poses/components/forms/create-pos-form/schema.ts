import { z } from "zod";

export const createPosFormSchema = z.object({
  artikul: z
    .string()
    .min(1, "Артикул є обов'язковим")
    .regex(/^\d{4}-\d{4}$/, "Артикул повинен мати формат ЦЦЦЦ-ЦЦЦЦ"),
  quant: z.number().min(1, "Кількість товару повинна бути більше 0"),
  boxes: z.number().min(1, "Кількість коробок повинна бути більше 0"),
  sklad: z.string().min(1, "Склад є обов'язковим"),
  date: z.string().optional(),
  comment: z.string().optional(),
});

export type CreatePosFormData = z.infer<typeof createPosFormSchema>;

export const createPosFormDefaultValues: CreatePosFormData = {
  artikul: "",
  quant: 0,
  boxes: 0,
  sklad: "pogrebi",
  date: "",
  comment: "",
};
