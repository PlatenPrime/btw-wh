import { z } from "zod";

export const askPosEditFormSchema = z.object({
  removedQuant: z
    .string()
    .min(1, "Кількість убраного товару є обов'язковою")
    .regex(
      /^(0|[1-9]\d*)$/,
      "Кількість повинна бути 0 або числом більше 0 без ведущих нулів",
    ),
  removedBoxes: z
    .string()
    .min(1, "Кількість убраних коробок є обов'язковою")
    .regex(
      /^(0|[1-9]\d*)$/,
      "Кількість коробок повинна бути 0 або числом більше 0 без ведущих нулів",
    ),
});

export type AskPosEditFormData = z.infer<typeof askPosEditFormSchema>;

export const createAskPosEditFormDefaultValues = (): AskPosEditFormData => ({
  removedQuant: "0",
  removedBoxes: "0",
});
