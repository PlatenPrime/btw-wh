import { z } from "zod";

export const updateAnalogFormSchema = z.object({
  konkName: z.string().min(1, "Оберіть конкурента").optional(),
  prodName: z.string().min(1, "Оберіть виробника").optional(),
  url: z.string().url("Коректне посилання").optional(),
  artikul: z.string().optional(),
});

export type UpdateAnalogFormData = z.infer<typeof updateAnalogFormSchema>;
