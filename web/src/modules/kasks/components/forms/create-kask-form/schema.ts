import { z } from "zod";

function preprocessQuant(val: unknown): number | undefined {
  if (val === "" || val === undefined || val === null) return undefined;
  const n = typeof val === "number" ? val : Number(val);
  return Number.isNaN(n) ? undefined : n;
}

const baseFields = {
  artikul: z
    .string()
    .min(1, "Артикул обов'язковий")
    .refine((v) => v.trim().length === 9, {
      message: "Артикул має бути 9 символів",
    }),
  nameukr: z.string().min(1, "Назва обов'язкова"),
  quant: z.preprocess(
    preprocessQuant,
    z
      .number({ invalid_type_error: "Вкажіть число" })
      .int("Лише ціле число")
      .min(1, "Мінімум 1")
      .optional(),
  ),
  zone: z.string(),
  com: z.string().default(""),
};

export const createKaskFormSchema = z
  .object(baseFields)
  .superRefine((data, ctx) => {
    if (!data.zone.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["zone"],
        message:
          "Дочекайтесь завантаження артикула або перевірте артикул — зона підтягується автоматично",
      });
    }
  });

export type CreateKaskFormData = z.infer<typeof createKaskFormSchema>;

export const createKaskFormDefaultValues: CreateKaskFormData = {
  artikul: "",
  nameukr: "",
  quant: undefined,
  zone: "",
  com: "",
};
