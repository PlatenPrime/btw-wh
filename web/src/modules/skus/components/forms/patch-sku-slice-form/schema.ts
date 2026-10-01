import { addDays, differenceInCalendarDays, format, parse } from "date-fns";
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

const periodItemSchema = z.object({
  dateFrom: z.string(),
  dateTo: z.string(),
});

export type PatchSkuSliceFormMode = "date" | "period" | "periods";

function parseApiDate(value: string): Date | null {
  if (!DATE_PATTERN.test(value)) return null;
  return parse(value, DATE_API_FORMAT, new Date());
}

function countUniqueDays(
  periods: Array<{ dateFrom: string; dateTo: string }>,
): number | null {
  const days = new Set<string>();
  for (const period of periods) {
    const from = parseApiDate(period.dateFrom);
    const to = parseApiDate(period.dateTo);
    if (!from || !to || from > to) return null;
    let cursor = from;
    while (cursor <= to) {
      days.add(format(cursor, DATE_API_FORMAT));
      cursor = addDays(cursor, 1);
    }
  }
  return days.size;
}

function refinePeriodBounds(
  dateFrom: string,
  dateTo: string,
  ctx: z.RefinementCtx,
  fromPath: Array<string | number>,
  toPath: Array<string | number>,
) {
  if (!DATE_PATTERN.test(dateFrom)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Оберіть початок періоду",
      path: fromPath,
    });
  }
  if (!DATE_PATTERN.test(dateTo)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Оберіть кінець періоду",
      path: toPath,
    });
  }
  if (!DATE_PATTERN.test(dateFrom) || !DATE_PATTERN.test(dateTo)) {
    return;
  }

  const from = parseApiDate(dateFrom);
  const to = parseApiDate(dateTo);
  if (!from || !to) return;

  if (from > to) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "dateFrom має бути ≤ dateTo",
      path: toPath,
    });
    return;
  }

  const daySpan = differenceInCalendarDays(to, from) + 1;
  if (daySpan > MAX_RANGE_DAYS) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Максимум ${MAX_RANGE_DAYS} днів`,
      path: toPath,
    });
  }
}

export const patchSkuSliceFormSchema = z
  .object({
    mode: z.enum(["date", "period", "periods"]),
    date: z.string(),
    dateFrom: z.string(),
    dateTo: z.string(),
    periods: z.array(periodItemSchema),
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

    if (value.mode === "period") {
      refinePeriodBounds(value.dateFrom, value.dateTo, ctx, ["dateFrom"], [
        "dateTo",
      ]);
      return;
    }

    if (value.periods.length < 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Додайте хоча б один період",
        path: ["periods"],
      });
      return;
    }

    value.periods.forEach((period, index) => {
      refinePeriodBounds(
        period.dateFrom,
        period.dateTo,
        ctx,
        ["periods", index, "dateFrom"],
        ["periods", index, "dateTo"],
      );
    });

    const uniqueDays = countUniqueDays(value.periods);
    if (uniqueDays !== null && uniqueDays > MAX_RANGE_DAYS) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Максимум ${MAX_RANGE_DAYS} унікальних днів сумарно`,
        path: ["periods"],
      });
    }
  });

export type PatchSkuSliceFormData = z.infer<typeof patchSkuSliceFormSchema>;

export type PatchSkuSliceFormInitialValues = {
  mode?: PatchSkuSliceFormMode;
  date?: string;
  dateFrom?: string;
  dateTo?: string;
  periods?: Array<{ dateFrom: string; dateTo: string }>;
  stock?: number;
  price?: number;
};

export { DATE_API_FORMAT, DATE_PATTERN, MAX_RANGE_DAYS };
