import { z } from "zod";

/** Mid-edit: 8 цифр; после blur: ЦЦЦЦ-ЦЦЦЦ */
const artikulSchema = z
  .string()
  .min(1, "Артикул є обов'язковим")
  .refine(
    (value) => /^\d{8}$/.test(value) || /^\d{4}-\d{4}$/.test(value),
    "Артикул повинен мати формат ЦЦЦЦ-ЦЦЦЦ",
  );

export const createAskFormSchema = z.object({
  artikul: artikulSchema,
  quant: z.string().optional(),
  com: z.string().optional(),
  sklad: z.enum(["pogrebi", "merezhi"]).optional(),
});

export type CreateAskFormData = z.infer<typeof createAskFormSchema>;

export const createAskFormDefaultValues: CreateAskFormData = {
  artikul: "",
  quant: "",
  com: "",
  sklad: "pogrebi",
};

