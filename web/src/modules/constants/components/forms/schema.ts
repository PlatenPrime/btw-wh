import { z } from "zod";

const nameWordSchema = z
  .string()
  .min(1, "Ключ (name) обовʼязковий")
  .regex(/^[a-zA-Z0-9_-]+$/, "Ключ має бути одним словом (латиниця, цифри, _ або -)");

const keyValueEntrySchema = z.object({
  key: z.string(),
  value: z.string(),
});

export const createConstantSchema = z.object({
  name: nameWordSchema,
  title: z.string().min(1, "Назва обовʼязкова"),
  dataEntries: z.array(keyValueEntrySchema).optional(),
});

export const updateConstantSchema = z.object({
  name: nameWordSchema.optional(),
  title: z.string().min(1, "Назва обовʼязкова").optional(),
  dataEntries: z.array(keyValueEntrySchema).optional(),
});

export type CreateConstantFormValues = z.infer<typeof createConstantSchema>;
export type UpdateConstantFormValues = z.infer<typeof updateConstantSchema>;

export const createConstantDefaultValues: CreateConstantFormValues = {
  name: "",
  title: "",
  dataEntries: [],
};

export const updateConstantDefaultValues: UpdateConstantFormValues = {};

export function dataEntriesToRecord(
  entries: Array<{ key: string; value: string }>,
): Record<string, string> {
  const record: Record<string, string> = {};
  for (const { key, value } of entries) {
    if (key.trim() !== "") {
      record[key.trim()] = value;
    }
  }
  return record;
}

export function recordToDataEntries(
  data: Record<string, string>,
): Array<{ key: string; value: string }> {
  return Object.entries(data).map(([key, value]) => ({ key, value }));
}

/** Схема для додавання однієї пари ключ–значення (унікальний ключ у межах constant.data). */
export const addConstantEntrySchema = z.object({
  key: z.string().min(1, "Ключ обовʼязковий"),
  value: z.string().min(1, "Значення обовʼязкове"),
});

export type AddConstantEntryFormValues = z.infer<typeof addConstantEntrySchema>;
