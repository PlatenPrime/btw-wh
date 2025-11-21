import { z } from "zod";

export const createBlockSchema = z.object({
  title: z.string().min(1, "Назва блоку є обов'язковою"),
});

export type CreateBlockFormValues = z.infer<typeof createBlockSchema>;

export const createBlockDefaultValues: CreateBlockFormValues = {
  title: "",
};

