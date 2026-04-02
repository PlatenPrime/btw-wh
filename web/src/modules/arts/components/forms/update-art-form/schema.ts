import { z } from "zod";

export const updateArtSchema = z.object({
  limit: z
    .number()
    .min(0, "Ліміт не може бути від'ємним")
    .max(999999, "Ліміт не може перевищувати 999999"),
  prodName: z.string(),
});

export type UpdateArtFormData = z.infer<typeof updateArtSchema>;
