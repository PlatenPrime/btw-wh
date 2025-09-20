import { z } from "zod";

export const createAskFormSchema = z.object({
  artikul: z
    .string()
    .min(1, "Артикул є обов'язковим")
    .regex(/^\d{4}-\d{4}$/, "Артикул повинен мати формат ЦЦЦЦ-ЦЦЦЦ"),
  quant: z.string().optional(),
  com: z.string().optional(),
});

export type CreateAskFormData = z.infer<typeof createAskFormSchema>;

export const createAskFormDefaultValues: CreateAskFormData = {
  artikul: "",
  quant: "",
  com: "",
};
