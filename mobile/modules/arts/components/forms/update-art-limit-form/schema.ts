import { z } from "zod";

export const updateArtLimitSchema = z.object({
  limit: z
    .number()
    .min(0, "Ліміт не може бути від'ємним")
    .max(999999, "Ліміт не може перевищувати 999999"),
});

export type UpdateArtLimitFormData = z.infer<typeof updateArtLimitSchema>;

