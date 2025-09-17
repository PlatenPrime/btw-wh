import { z } from "zod";

export const askPosEditFormSchema = z.object({
  removedQuant: z
    .string()
    .min(1, "Кількість убраного товару є обов'язковою")
    .regex(
      /^-?(0|[1-9]\d*)$/,
      "Кількість повинна бути цілим числом (може бути від'ємним)",
    ),
  removedBoxes: z
    .string()
    .min(1, "Кількість убраних коробок є обов'язковою")
    .regex(
      /^-?(0|[1-9]\d*)$/,
      "Кількість коробок повинна бути цілим числом (може бути від'ємним)",
    ),
});

export type AskPosEditFormData = z.infer<typeof askPosEditFormSchema>;

export const createAskPosEditFormDefaultValues = (): AskPosEditFormData => ({
  removedQuant: "0",
  removedBoxes: "0",
});
