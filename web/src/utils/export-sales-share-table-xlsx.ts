import * as XLSX from "xlsx";
import type { WorkSheet } from "xlsx";

export type SalesShareMetric = "salesUah" | "salesPcs";

const WINDOWS_INVALID_FILENAME_CHARS = /[<>:"/\\|?*\u0000-\u001f]/g;

export function sanitizeFilenamePart(value: string): string {
  const trimmed = value.trim().replace(WINDOWS_INVALID_FILENAME_CHARS, "_");
  const collapsed = trimmed.replace(/\s+/g, "_");
  return collapsed.length > 0 ? collapsed : "export";
}

export interface SalesShareTableExportRow {
  label: string;
  salesPcs: number;
  salesUah: number;
  sharePercent: number;
}

export interface ExportSalesShareTableToXlsxParams {
  rows: SalesShareTableExportRow[];
  metric: SalesShareMetric;
  groupColumnTitle: string;
  filename: string;
}

const SHARE_COLUMN_INDEX = 3;
const PERCENT_NUMBER_FORMAT = "0.00";

function roundPercentTwoDecimals(value: number): number {
  return Math.round(value * 100) / 100;
}

function applyPercentColumnNumberFormat(worksheet: WorkSheet): void {
  const ref = worksheet["!ref"];
  if (!ref) return;

  const range = XLSX.utils.decode_range(ref);
  for (let r = range.s.r + 1; r <= range.e.r; r += 1) {
    const addr = XLSX.utils.encode_cell({ r, c: SHARE_COLUMN_INDEX });
    const cell = worksheet[addr];
    if (cell && cell.t === "n" && typeof cell.v === "number") {
      cell.z = PERCENT_NUMBER_FORMAT;
    }
  }
}

export function exportSalesShareTableToXlsx({
  rows,
  metric,
  groupColumnTitle,
  filename,
}: ExportSalesShareTableToXlsxParams): void {
  const shareColumnTitle =
    metric === "salesUah" ? "Частка за виручкою" : "Частка за продажами";

  const totalPcs = rows.reduce((acc, row) => acc + row.salesPcs, 0);
  const totalUah = rows.reduce((acc, row) => acc + row.salesUah, 0);

  const header = [
    groupColumnTitle,
    "Продажі, шт",
    "Виручка, грн",
    shareColumnTitle,
  ];

  const body = rows.map((row) => [
    row.label,
    row.salesPcs,
    row.salesUah,
    roundPercentTwoDecimals(row.sharePercent),
  ]);

  const footer: (string | number)[] = [
    "Усього",
    totalPcs,
    totalUah,
    roundPercentTwoDecimals(100),
  ];

  const aoa = [header, ...body, footer];

  const worksheet = XLSX.utils.aoa_to_sheet(aoa);
  applyPercentColumnNumberFormat(worksheet);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Дані");
  XLSX.writeFile(workbook, filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`);
}

export function buildSkuStatisticsManufacturersExportFilename(
  konk: string,
  dateFrom: string,
  dateTo: string,
): string {
  return `sku_statistics_manufacturers_${sanitizeFilenamePart(konk)}_${sanitizeFilenamePart(dateFrom)}_${sanitizeFilenamePart(dateTo)}.xlsx`;
}

export function buildSkuKonkProdSkugrGroupsExportFilename(
  konk: string,
  prod: string,
  dateFrom: string,
  dateTo: string,
): string {
  return `sku_konk_prod_skugr_groups_${sanitizeFilenamePart(konk)}_${sanitizeFilenamePart(prod)}_${sanitizeFilenamePart(dateFrom)}_${sanitizeFilenamePart(dateTo)}.xlsx`;
}

export function buildSkuStatisticsSkusExportFilename(
  skugrId: string,
  dateFrom: string,
  dateTo: string,
  konk?: string,
  prod?: string,
): string {
  const parts = [
    "sku_statistics_skus",
    konk ? sanitizeFilenamePart(konk) : null,
    prod ? sanitizeFilenamePart(prod) : null,
    sanitizeFilenamePart(skugrId),
    sanitizeFilenamePart(dateFrom),
    sanitizeFilenamePart(dateTo),
  ].filter(Boolean);
  return `${parts.join("_")}.xlsx`;
}
