import { z } from "zod";

const nonNegNumber = z.coerce
  .number({ invalid_type_error: "Введіть число" })
  .finite("Введіть коректне число")
  .min(0, "Значення ≥ 0");

const bandBoundsSchema = z
  .object({
    konkName: z.string().min(1, "Оберіть конкурента"),
    stockMin: nonNegNumber,
    stockMax: nonNegNumber,
    normalMax: nonNegNumber,
  })
  .superRefine((values, ctx) => {
    if (values.stockMax < values.stockMin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["stockMax"],
        message: "Макс. має бути ≥ мін.",
      });
    }
    if (values.normalMax >= values.stockMin) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["normalMax"],
        message: "Норма має бути < мін. смуги",
      });
    }
  });

export const createSkuStockBandSchema = bandBoundsSchema;
export const updateSkuStockBandSchema = bandBoundsSchema;

export type CreateSkuStockBandFormValues = z.infer<
  typeof createSkuStockBandSchema
>;
export type UpdateSkuStockBandFormValues = z.infer<
  typeof updateSkuStockBandSchema
>;

export const createSkuStockBandDefaultValues: CreateSkuStockBandFormValues = {
  konkName: "",
  stockMin: 0,
  stockMax: 0,
  normalMax: 0,
};
