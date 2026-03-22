import type { SkuSalesRangeItem } from "@/modules/skus/api/types";
import { format, parseISO } from "date-fns";
import { utils, writeFile } from "xlsx";

function formatRowDate(isoDate: string): string {
  try {
    return format(parseISO(isoDate), "dd.MM.yyyy");
  } catch {
    return isoDate;
  }
}

/** Небезпечні для імені файлу символи прибираємо як на бекенді для slice-excel. */
export function sanitizeExcelFilenamePart(value: string): string {
  return value.replace(/[<>:"/\\|?*]/g, "_").trim() || "sku";
}

export function exportSkuSalesRangeToXlsx(
  items: SkuSalesRangeItem[],
  filenameBase: string,
): void {
  const header = [
    "Дата",
    "Продажі (шт)",
    "Виручка (грн)",
    "Ціна (грн)",
    "День постачання",
  ] as const;

  const rows: (string | number)[][] = items.map((row) => [
    formatRowDate(row.date),
    row.sales,
    row.revenue,
    row.price,
    row.isDeliveryDay ? "Так" : "Ні",
  ]);

  const sheet = utils.aoa_to_sheet([[...header], ...rows]);
  const book = utils.book_new();
  utils.book_append_sheet(book, sheet, "Продажі");
  writeFile(book, `${filenameBase}.xlsx`);
}
