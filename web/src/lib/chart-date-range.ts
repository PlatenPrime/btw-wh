import { format, subDays } from "date-fns";

export type ChartDateRange = {
  dateFrom: string;
  dateTo: string;
};

export function getChartDateRangeForLastDays(
  dayCount: number,
): ChartDateRange {
  const today = new Date();
  const from = subDays(today, dayCount - 1);
  return {
    dateFrom: format(from, "yyyy-MM-dd"),
    dateTo: format(today, "yyyy-MM-dd"),
  };
}

export function normalizeChartDateRangeOrder(
  from: string,
  to: string,
): ChartDateRange {
  if (from > to) {
    return { dateFrom: to, dateTo: from };
  }
  return { dateFrom: from, dateTo: to };
}
