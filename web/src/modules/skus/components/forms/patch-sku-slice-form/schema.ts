import { differenceInCalendarDays, parse } from "date-fns";
import { z } from "zod";

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DATE_API_FORMAT = "yyyy-MM-dd";
const MAX_RANGE_DAYS = 366;

const finiteNumber = (message: string) =>
  z
    .number({
      required_error: message,
      invalid_type_error: message,
    })
    .refine((value) => Number.isFinite(value), message);

export type PatchSkuSliceFormMode = "date" | "period";

export const patchSkuSliceFormSchema = z
  .object({
    mode: z.enum(["date", "period"]),
    date: z.string(),
    dateFrom: z.string(),
    dateTo: z.string(),
    stock: finiteNumber("Вкажіть залишок"),
    price: finiteNumber("Вкажіть ціну"),
  })
  .superRefine((value, ctx) => {
    if (value.mode === "date") {
      if (!DATE_PATTERN.test(value.date)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Оберіть дату",
          path: ["date"],
        });
      }
      return;
    }

    if (!DATE_PATTERN.test(value.dateFrom)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Оберіть початок періоду",
        path: ["dateFrom"],
      });
    }
    if (!DATE_PATTERN.test(value.dateTo)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Оберіть кінець періоду",
        path: ["dateTo"],
      });
    }
    if (
      !DATE_PATTERN.test(value.dateFrom) ||
      !DATE_PATTERN.test(value.dateTo)
    ) {
      return;
    }

    const from = parse(value.dateFrom, DATE_API_FORMAT, new Date());
    const to = parse(value.dateTo, DATE_API_FORMAT, new Date());
    if (from > to) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "dateFrom має бути ≤ dateTo",
        path: ["dateTo"],
      });
      return;
    }

    const daySpan = differenceInCalendarDays(to, from) + 1;
    if (daySpan > MAX_RANGE_DAYS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Максимум ${MAX_RANGE_DAYS} днів`,
        path: ["dateTo"],
      });
    }
  });

export type PatchSkuSliceFormData = z.infer<typeof patchSkuSliceFormSchema>;

export { DATE_API_FORMAT, DATE_PATTERN, MAX_RANGE_DAYS };
