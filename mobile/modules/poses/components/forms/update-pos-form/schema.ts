import { z } from "zod";

export const updatePosFormSchema = z.object({
  quant: z
    .string()
    .min(1, "Кількість товару є обов'язковою")
    .regex(
      /^(0|[1-9]\d*)$/,
      "Кількість повинна бути 0 або числом більше 0 без лидирующих нулів",
    ),
  boxes: z
    .string()
    .min(1, "Кількість коробок є обов'язковою")
    .regex(
      /^(0|[1-9]\d*)$/,
      "Кількість коробок повинна бути 0 або числом більше 0 без лидирующих нулів",
    ),
  sklad: z.string().min(1, "Склад є обов'язковим"),
});

export type UpdatePosFormData = z.infer<typeof updatePosFormSchema>;

export const createUpdatePosFormDefaultValues = (pos: {
  quant: number;
  boxes: number;
  sklad: string;
}): UpdatePosFormData => ({
  quant: pos.quant.toString(),
  boxes: pos.boxes.toString(),
  sklad: pos.sklad,
});

