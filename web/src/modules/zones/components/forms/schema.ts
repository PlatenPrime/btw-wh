import { z } from "zod";

// Паттерн для title: 1-2 цифры, затем 0-2 группы из дефиса и 1-2 цифр
const zoneTitlePattern = /^\d{1,2}(-\d{1,2}){0,2}$/;

// Схема для создания зоны
export const createZoneSchema = z.object({
  title: z
    .string()
    .min(1, "Название зоны обязательно")
    .regex(zoneTitlePattern, "Название должно быть в формате: 42-1 или 42-5-2"),
  bar: z
    .number()
    .int("Штрихкод должен быть целым числом")
    .positive("Штрихкод должен быть положительным числом"),
  sector: z
    .number()
    .int("Сектор должен быть целым числом")
    .min(0, "Сектор не может быть отрицательным"),
});

// Схема для обновления зоны (все поля опциональные)
export const updateZoneSchema = z
  .object({
    title: z
      .string()
      .min(1, "Название зоны обязательно")
      .regex(
        zoneTitlePattern,
        "Название должно быть в формате: 42-1 или 42-5-2",
      )
      .optional(),
    bar: z
      .number()
      .int("Штрихкод должен быть целым числом")
      .positive("Штрихкод должен быть положительным числом")
      .optional(),
    sector: z
      .number()
      .int("Сектор должен быть целым числом")
      .min(0, "Сектор не может быть отрицательным")
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    "Необходимо указать хотя бы одно поле для обновления",
  );

// Схема для массового создания зон
export const bulkCreateZoneSchema = z.object({
  zones: z
    .array(
      z.object({
        title: z
          .string()
          .min(1, "Название зоны обязательно")
          .regex(
            zoneTitlePattern,
            "Название должно быть в формате: 42-1 или 42-5-2",
          ),
        bar: z
          .number()
          .int("Штрихкод должен быть целым числом")
          .positive("Штрихкод должен быть положительным числом"),
      }),
    )
    .min(1, "Необходимо добавить хотя бы одну зону")
    .max(1000, "Максимум 1000 зон за раз"),
});

// Типы для форм
export type CreateZoneFormValues = z.infer<typeof createZoneSchema>;
export type UpdateZoneFormValues = z.infer<typeof updateZoneSchema>;
export type BulkCreateZoneFormValues = z.infer<typeof bulkCreateZoneSchema>;

// Значения по умолчанию
export const createZoneDefaultValues: CreateZoneFormValues = {
  title: "",
  bar: 0,
  sector: 0,
};

export const updateZoneDefaultValues: UpdateZoneFormValues = {};

export const bulkCreateZoneDefaultValues: BulkCreateZoneFormValues = {
  zones: [],
};
