import { z } from "zod";

export const createBlockSchema = z.object({
  title: z
    .string({
      required_error: "Назва обовʼязкова",
    })
    .min(1, "Назва обовʼязкова")
    .max(64, "До 64 символів"),
});

export type CreateBlockFormValues = z.infer<typeof createBlockSchema>;

export const createBlockDefaultValues: CreateBlockFormValues = {
  title: "",
};

