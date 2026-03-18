import { z } from "zod";

export const updateVariantFormSchema = z.object({
  konkName: z.string().optional(),
  prodName: z.string().optional(),
  title: z.string().optional(),
  url: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type UpdateVariantFormData = z.infer<typeof updateVariantFormSchema>;

