import { z } from "zod";

export const renameBlockSchema = z.object({
    title: z.string().min(1, "Назва блоку є обов'язковою"),
});

export type RenameBlockFormValues = z.infer<typeof renameBlockSchema>;
