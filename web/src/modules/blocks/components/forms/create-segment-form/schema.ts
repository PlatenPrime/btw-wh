import { z } from "zod";

export const createSegmentSchema = z.object({
  order: z.number().min(1, "Порядок сегмента має бути не менше 1"),
  zones: z.array(z.string()).min(1, "Необхідно вибрати принаймні одну зону"),
});

export type CreateSegmentFormValues = z.infer<typeof createSegmentSchema>;

export const createSegmentDefaultValues: CreateSegmentFormValues = {
  order: 1,
  zones: [],
};

