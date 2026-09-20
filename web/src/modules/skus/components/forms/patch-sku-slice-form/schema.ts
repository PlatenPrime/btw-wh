import { z } from "zod";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const finiteNumber = (message: string) =>
  z
    .number({
      required_error: message,
      invalid_type_error: message,
    })
    .refine((value) => Number.isFinite(value), message);

export const patchSkuSliceFormSchema = z.object({
  date: z.string().regex(DATE_PATTERN, "Оберіть дату"),
  stock: finiteNumber("Вкажіть залишок"),
  price: finiteNumber("Вкажіть ціну"),
});

export type PatchSkuSliceFormData = z.infer<typeof patchSkuSliceFormSchema>;
