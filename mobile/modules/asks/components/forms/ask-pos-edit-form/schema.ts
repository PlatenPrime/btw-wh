import { z } from "zod";

export const askPosEditFormSchema = z.object({
  removedQuant: z
    .string()
    .refine(
      (val) => val === "" || /^-?(0|[1-9]\d*)$/.test(val),
      "Кількість повинна бути цілим числом (може бути від'ємним)",
    )
    .refine((val) => val !== "", "Кількість знятого товару є обов'язковою"),
  removedBoxes: z
    .string()
    .refine(
      (val) => val === "" || /^-?(0|[1-9]\d*)$/.test(val),
      "Кількість коробок повинна бути цілим числом (може бути від'ємним)",
    ),
});

export type AskPosEditFormData = z.infer<typeof askPosEditFormSchema>;

export const createAskPosEditFormDefaultValues = (
  initialRemovedQuant?: number,
): AskPosEditFormData => ({
  removedQuant: initialRemovedQuant !== undefined ? String(initialRemovedQuant) : "",
  removedBoxes: "",
});

