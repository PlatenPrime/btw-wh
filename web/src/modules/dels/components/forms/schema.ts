import { z } from "zod";

export const createDelSchema = z.object({
  title: z.string().min(1, "Назва поставки обовʼязкова"),
});

export type CreateDelFormValues = z.infer<typeof createDelSchema>;

export const createDelDefaultValues: CreateDelFormValues = {
  title: "",
};
