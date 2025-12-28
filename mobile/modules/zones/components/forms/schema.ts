import { z } from "zod";

// Паттерн для title: 1-2 цифры, затем 0-2 группы из дефиса и 1-2 цифр
const zoneTitlePattern = /^\d{1,2}(-\d{1,2}){0,2}$/;

// Схема для создания зоны
export const createZoneSchema = z.object({
  title: z
    .string()
    .min(1, "Назва зони обов'язкова")
    .regex(zoneTitlePattern, "Назва повинна бути у форматі: 42-1 або 42-5-2"),
  bar: z
    .number()
    .int("Штрихкод повинен бути цілим числом")
    .positive("Штрихкод повинен бути додатнім числом"),
  sector: z
    .number()
    .int("Сектор повинен бути цілим числом")
    .min(0, "Сектор не може бути від'ємним"),
});

// Схема для обновления зоны (все поля опциональные)
export const updateZoneSchema = z
  .object({
    title: z
      .string()
      .min(1, "Назва зони обов'язкова")
      .regex(
        zoneTitlePattern,
        "Назва повинна бути у форматі: 42-1 або 42-5-2",
      )
      .optional(),
    bar: z
      .number()
      .int("Штрихкод повинен бути цілим числом")
      .positive("Штрихкод повинен бути додатнім числом")
      .optional(),
    sector: z
      .number()
      .int("Сектор повинен бути цілим числом")
      .min(0, "Сектор не може бути від'ємним")
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "Необхідно вказати хоча б одне поле для оновлення",
  );

// Типы для форм
export type CreateZoneFormValues = z.infer<typeof createZoneSchema>;
export type UpdateZoneFormValues = z.infer<typeof updateZoneSchema>;

// Значения по умолчанию
export const createZoneDefaultValues: CreateZoneFormValues = {
  title: "",
  bar: 0,
  sector: 0,
};

export const updateZoneDefaultValues: UpdateZoneFormValues = {};

