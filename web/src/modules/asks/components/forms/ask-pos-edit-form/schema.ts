import { z } from "zod";

export const askPosEditFormSchema = z.object({
  removedQuant: z
    .string()
    .min(1, "Количество убранного товара обязательно")
    .regex(
      /^(0|[1-9]\d*)$/,
      "Количество должно быть 0 или числом больше 0 без ведущих нулей",
    ),
  removedBoxes: z
    .string()
    .min(1, "Количество убранных коробок обязательно")
    .regex(
      /^(0|[1-9]\d*)$/,
      "Количество коробок должно быть 0 или числом больше 0 без ведущих нулей",
    ),
});

export type AskPosEditFormData = z.infer<typeof askPosEditFormSchema>;

export const createAskPosEditFormDefaultValues = (): AskPosEditFormData => ({
  removedQuant: "0",
  removedBoxes: "0",
});
