import { z } from "zod";

export const createSkugrFormSchema = z.object({
  konkName: z.string().min(1, "Оберіть конкурента"),
  prodName: z.string().min(1, "Оберіть виробника"),
  title: z.string().min(1, "Вкажіть назву"),
  url: z.string().url("Некоректний URL"),
  isSliced: z.boolean(),
});

export type CreateSkugrFormData = z.infer<typeof createSkugrFormSchema>;

export const createSkugrFormDefaultValues: CreateSkugrFormData = {
  konkName: "",
  prodName: "",
  title: "",
  url: "",
  isSliced: true,
};
