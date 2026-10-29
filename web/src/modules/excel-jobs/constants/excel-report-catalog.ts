import type { ExcelJobKind } from "@/modules/excel-jobs/api/types";

export const EXCEL_REPORT_OBJECTS = [
  "catalog",
  "sku",
  "skugr",
  "konk-sku",
  "art",
  "directory",
] as const;

export type ExcelReportObject = (typeof EXCEL_REPORT_OBJECTS)[number];

export const EXCEL_REPORT_FILE_IDS = [
  "new-since",
  "invalid",
  "stock",
  "sales",
  "arts-export",
  "arts-export-with-stocks",
  "arts-export-keys",
  "zones-export",
  "grabo-skus",
  "poses-export-stocks",
] as const;

export type ExcelReportFileId = (typeof EXCEL_REPORT_FILE_IDS)[number];

export type ExcelReportPeriod = "range" | "since" | "none";

export type ExcelReportIdentity =
  | "konk-or-all"
  | "konk-prod"
  | "sku"
  | "skugr"
  | "art"
  | "none";

export type ExcelReportRefinement =
  | "stock-metrics"
  | "sales-metrics"
  | "sales-sort"
  | "skugr-ids"
  | "abc"
  | "sklad";

export interface ExcelReportFileDef {
  id: ExcelReportFileId;
  label: string;
  kind: ExcelJobKind;
  period: ExcelReportPeriod;
  refinements: readonly ExcelReportRefinement[];
}

export interface ExcelReportObjectDef {
  id: ExcelReportObject;
  label: string;
  identity: ExcelReportIdentity;
  files: readonly ExcelReportFileDef[];
}

const stockSalesFiles = (
  stockKind: ExcelJobKind,
  salesKind: ExcelJobKind,
  extraSales: readonly ExcelReportRefinement[] = [],
  extraBoth: readonly ExcelReportRefinement[] = [],
): readonly ExcelReportFileDef[] => [
  {
    id: "stock",
    label: "Залишки",
    kind: stockKind,
    period: "range",
    refinements: ["stock-metrics", ...extraBoth],
  },
  {
    id: "sales",
    label: "Продажі",
    kind: salesKind,
    period: "range",
    refinements: ["sales-metrics", ...extraSales, ...extraBoth],
  },
];

export const EXCEL_REPORT_CATALOG: readonly ExcelReportObjectDef[] = [
  {
    id: "catalog",
    label: "Каталог SKU",
    identity: "konk-or-all",
    files: [
      {
        id: "new-since",
        label: "Нові з дати",
        kind: "sku-catalog-new-since",
        period: "since",
        refinements: [],
      },
      {
        id: "invalid",
        label: "Невалідні",
        kind: "sku-catalog-invalid",
        period: "none",
        refinements: [],
      },
    ],
  },
  {
    id: "sku",
    label: "Один SKU",
    identity: "sku",
    files: stockSalesFiles("sku-one-stock", "sku-one-sales"),
  },
  {
    id: "skugr",
    label: "Товарна група",
    identity: "skugr",
    files: stockSalesFiles("sku-skugr-stock", "sku-skugr-sales"),
  },
  {
    id: "konk-sku",
    label: "SKU конкурента",
    identity: "konk-prod",
    files: stockSalesFiles(
      "sku-konk-stock",
      "sku-konk-sales",
      ["sales-sort"],
      ["skugr-ids"],
    ),
  },
  {
    id: "art",
    label: "Артикул",
    identity: "art",
    files: [
      {
        id: "stock",
        label: "Залишки",
        kind: "art-stock",
        period: "range",
        refinements: [],
      },
      {
        id: "sales",
        label: "Продажі",
        kind: "art-sales",
        period: "range",
        refinements: [],
      },
    ],
  },
  {
    id: "directory",
    label: "Довідник",
    identity: "none",
    files: [
      {
        id: "arts-export",
        label: "Експорт артикулів",
        kind: "arts-export",
        period: "none",
        refinements: [],
      },
      {
        id: "arts-export-with-stocks",
        label: "Артикули з залишками",
        kind: "arts-export-with-stocks",
        period: "none",
        refinements: [],
      },
      {
        id: "arts-export-keys",
        label: "Ключі артикулів",
        kind: "arts-export-keys",
        period: "none",
        refinements: [],
      },
      {
        id: "zones-export",
        label: "Експорт зон",
        kind: "zones-export",
        period: "none",
        refinements: [],
      },
      {
        id: "grabo-skus",
        label: "Grabo каталог",
        kind: "grabo-skus",
        period: "none",
        refinements: [],
      },
      {
        id: "poses-export-stocks",
        label: "Залишки позицій",
        kind: "poses-export-stocks",
        period: "none",
        refinements: ["sklad"],
      },
    ],
  },
];

export function getExcelReportObject(
  objectId: ExcelReportObject | "",
): ExcelReportObjectDef | null {
  if (!objectId) return null;
  return EXCEL_REPORT_CATALOG.find((item) => item.id === objectId) ?? null;
}

export function getExcelReportFile(
  objectId: ExcelReportObject | "",
  fileId: ExcelReportFileId | "",
): ExcelReportFileDef | null {
  if (!fileId) return null;
  const objectDef = getExcelReportObject(objectId);
  if (!objectDef) return null;
  return objectDef.files.find((file) => file.id === fileId) ?? null;
}

export function excelReportObjectNeedsKonks(
  objectId: ExcelReportObject | "",
): boolean {
  const identity = getExcelReportObject(objectId)?.identity;
  return identity === "konk-or-all" || identity === "konk-prod";
}

export function excelReportObjectNeedsProds(
  objectId: ExcelReportObject | "",
): boolean {
  return getExcelReportObject(objectId)?.identity === "konk-prod";
}

export function excelReportFileHasRefinement(
  file: ExcelReportFileDef | null,
  refinement: ExcelReportRefinement,
): boolean {
  return file?.refinements.includes(refinement) ?? false;
}
