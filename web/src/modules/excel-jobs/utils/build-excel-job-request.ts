import { sklads, type SkladCode } from "@/constants/sklad";
import type {
  ExcelJobKind,
  ExcelJobParams,
  StartExcelJobInput,
} from "@/modules/excel-jobs/api/types";
import {
  getExcelReportFile,
  getExcelReportObject,
  type ExcelReportFileDef,
  type ExcelReportFileId,
  type ExcelReportObject,
  type ExcelReportPeriod,
} from "@/modules/excel-jobs/constants/excel-report-catalog";
import type { SkuSalesExcelMetric } from "@/modules/excel-jobs/types/sku-sales-excel-metrics";
import type { SkuStockExcelMetric } from "@/modules/excel-jobs/types/sku-stock-excel-metrics";
import { getExcelJobKindLabel } from "@/modules/excel-jobs/utils/labels";

import {
  buildSkuSelectionScopeParams,
  withIncludeImages,
} from "@/modules/excel-jobs/utils/build-sku-selection-params";

export type ExcelSalesSort = "default" | "sales" | "revenue";

export interface ExcelReportOrderDraft {
  objectId: ExcelReportObject | "";
  fileId: ExcelReportFileId | "";
  konk: string;
  prod: string;
  skuId: string;
  skuTitle: string;
  skuIds: readonly string[];
  skuSelectAll: boolean;
  skuSelectionSearch: string;
  skuSelectionKonkName: string;
  skuSelectionProdName: string;
  skuMatchedTotal: number;
  skugrId: string;
  skugrTitle: string;
  analogId: string;
  analogTitle: string;
  artikul: string;
  artTitle: string;
  dateFrom: string;
  dateTo: string;
  since: string;
  stockMetrics: readonly SkuStockExcelMetric[];
  salesMetrics: readonly SkuSalesExcelMetric[];
  salesSort: ExcelSalesSort;
  skugrIds: readonly string[];
  abc: string;
  sortByAbc: boolean;
  sklad: SkladCode | null;
  includeImages: boolean;
}

const INCLUDE_IMAGES_KINDS = new Set<ExcelJobKind>([
  "sku-konk-stock",
  "sku-konk-sales",
  "sku-skugr-stock",
  "sku-skugr-sales",
  "sku-skugr-skus-share",
  "sku-selection-stock",
  "sku-selection-sales",
]);

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function hasIsoRange(dateFrom: string, dateTo: string): boolean {
  return (
    ISO_DATE.test(dateFrom) && ISO_DATE.test(dateTo) && dateFrom <= dateTo
  );
}

function periodReady(period: ExcelReportPeriod, draft: ExcelReportOrderDraft): boolean {
  if (period === "none") return true;
  if (period === "since") return ISO_DATE.test(draft.since);
  return hasIsoRange(draft.dateFrom, draft.dateTo);
}

function identityReady(
  draft: ExcelReportOrderDraft,
  file: ExcelReportFileDef,
): boolean {
  const objectDef = getExcelReportObject(draft.objectId);
  if (!objectDef || !objectDef.files.some((item) => item.kind === file.kind)) {
    return false;
  }

  switch (objectDef.identity) {
    case "konk-or-all":
      return draft.konk.trim().length > 0;
    case "konk-prod":
      return draft.konk.trim().length > 0 && draft.prod.trim().length > 0;
    case "sku":
      return draft.skuId.trim().length > 0;
    case "sku-ids":
      return draft.skuSelectAll || draft.skuIds.length >= 1;
    case "skugr":
      return draft.skugrId.trim().length > 0;
    case "art":
      return draft.artikul.trim().length > 0;
    case "none":
      return true;
    default: {
      const unreachable: never = objectDef.identity;
      return unreachable;
    }
  }
}

function refinementsReady(
  file: ExcelReportFileDef,
  draft: ExcelReportOrderDraft,
): boolean {
  if (file.refinements.includes("stock-metrics") && draft.stockMetrics.length === 0) {
    return false;
  }
  if (file.refinements.includes("sales-metrics") && draft.salesMetrics.length === 0) {
    return false;
  }
  return true;
}

export function isExcelReportOrderReady(draft: ExcelReportOrderDraft): boolean {
  const file = getExcelReportFile(draft.objectId, draft.fileId);
  if (!file) return false;
  return (
    identityReady(draft, file) &&
    periodReady(file.period, draft) &&
    refinementsReady(file, draft)
  );
}

function withRange(
  draft: ExcelReportOrderDraft,
  params: ExcelJobParams,
): ExcelJobParams {
  return {
    ...params,
    dateFrom: draft.dateFrom,
    dateTo: draft.dateTo,
  };
}

function withOptionalSkugrIds(
  draft: ExcelReportOrderDraft,
  params: ExcelJobParams,
): ExcelJobParams {
  if (draft.skugrIds.length === 0) return params;
  return { ...params, skugrIds: [...draft.skugrIds] };
}

function withAbc(
  draft: ExcelReportOrderDraft,
  params: ExcelJobParams,
): ExcelJobParams {
  return {
    ...params,
    ...(draft.abc ? { abc: draft.abc } : {}),
    ...(draft.sortByAbc ? { sortBy: "abc" } : {}),
  };
}

function maybeWithImages(
  kind: ExcelJobKind,
  draft: ExcelReportOrderDraft,
  params: ExcelJobParams,
): ExcelJobParams {
  if (!INCLUDE_IMAGES_KINDS.has(kind)) return params;
  return withIncludeImages(params, draft.includeImages);
}

function buildParams(
  kind: ExcelJobKind,
  draft: ExcelReportOrderDraft,
): ExcelJobParams {
  switch (kind) {
    case "sku-catalog-new-since":
      return { konk: draft.konk, since: draft.since };
    case "sku-catalog-invalid":
      return { konk: draft.konk };
    case "sku-one-stock":
      return withRange(draft, {
        skuId: draft.skuId,
        metrics: [...draft.stockMetrics],
      });
    case "sku-one-sales":
      return withRange(draft, {
        skuId: draft.skuId,
        metrics: [...draft.salesMetrics],
      });
    case "sku-selection-stock":
      return maybeWithImages(
        kind,
        draft,
        withRange(draft, {
          ...buildSkuSelectionScopeParams({
            selectAll: draft.skuSelectAll,
            skuIds: draft.skuIds,
            query: {
              search: draft.skuSelectionSearch,
              konkName: draft.skuSelectionKonkName,
              prodName: draft.skuSelectionProdName,
            },
          }),
          metrics: [...draft.stockMetrics],
        }),
      );
    case "sku-selection-sales":
      return maybeWithImages(
        kind,
        draft,
        withRange(draft, {
          ...buildSkuSelectionScopeParams({
            selectAll: draft.skuSelectAll,
            skuIds: draft.skuIds,
            query: {
              search: draft.skuSelectionSearch,
              konkName: draft.skuSelectionKonkName,
              prodName: draft.skuSelectionProdName,
            },
          }),
          metrics: [...draft.salesMetrics],
        }),
      );
    case "sku-skugr-stock":
      return maybeWithImages(
        kind,
        draft,
        withRange(draft, {
          skugrId: draft.skugrId,
          metrics: [...draft.stockMetrics],
        }),
      );
    case "sku-skugr-sales":
      return maybeWithImages(
        kind,
        draft,
        withRange(draft, {
          skugrId: draft.skugrId,
          metrics: [...draft.salesMetrics],
        }),
      );
    case "sku-skugr-skus-share":
      return maybeWithImages(
        kind,
        draft,
        withRange(draft, {
          skugrId: draft.skugrId,
          ...(draft.salesSort === "default" ? {} : { sortBy: draft.salesSort }),
        }),
      );
    case "sku-konk-stock":
      return maybeWithImages(
        kind,
        draft,
        withOptionalSkugrIds(
          draft,
          withRange(draft, {
            konk: draft.konk,
            prod: draft.prod,
            metrics: [...draft.stockMetrics],
          }),
        ),
      );
    case "sku-konk-sales":
      return maybeWithImages(
        kind,
        draft,
        withOptionalSkugrIds(
          draft,
          withRange(draft, {
            konk: draft.konk,
            prod: draft.prod,
            metrics: [...draft.salesMetrics],
            ...(draft.salesSort === "default" ? {} : { sortBy: draft.salesSort }),
          }),
        ),
      );
    case "art-stock":
    case "art-sales":
      return withRange(draft, { artikul: draft.artikul });
    case "analog-comparison":
    case "analog-sales-comparison":
      return withRange(draft, { analogId: draft.analogId });
    case "konk-btrade-comparison":
    case "konk-btrade-sales-comparison":
      return withAbc(
        draft,
        withRange(draft, { konk: draft.konk, prod: draft.prod }),
      );
    case "poses-export-stocks":
      return draft.sklad ? { sklad: draft.sklad } : {};
    case "arts-export":
    case "arts-export-with-stocks":
    case "arts-export-keys":
    case "zones-export":
    case "grabo-skus":
      return {};
    default: {
      const unreachable: never = kind;
      return unreachable;
    }
  }
}

function subjectFor(kind: ExcelJobKind, draft: ExcelReportOrderDraft): string {
  switch (kind) {
    case "sku-one-stock":
    case "sku-one-sales":
      return draft.skuTitle.trim();
    case "sku-selection-stock":
    case "sku-selection-sales":
      if (draft.skuSelectAll) {
        return draft.skuMatchedTotal > 0
          ? `усі (${draft.skuMatchedTotal}) SKU`
          : "усі SKU";
      }
      return draft.skuIds.length > 0 ? `${draft.skuIds.length} SKU` : "";
    case "sku-skugr-stock":
    case "sku-skugr-sales":
    case "sku-skugr-skus-share":
      return draft.skugrTitle.trim();
    case "art-stock":
    case "art-sales":
      return draft.artTitle.trim() || draft.artikul.trim();
    case "analog-comparison":
    case "analog-sales-comparison":
      return draft.analogTitle.trim();
    case "sku-konk-stock":
    case "sku-konk-sales":
    case "konk-btrade-comparison":
    case "konk-btrade-sales-comparison":
      return draft.konk.trim();
    case "poses-export-stocks":
      return draft.sklad ? sklads[draft.sklad] : "";
    default:
      return "";
  }
}

export function buildExcelJobRequest(
  draft: ExcelReportOrderDraft,
): StartExcelJobInput | null {
  const file = getExcelReportFile(draft.objectId, draft.fileId);
  if (!file || !isExcelReportOrderReady(draft)) return null;

  const base = getExcelJobKindLabel(file.kind);
  const subject = subjectFor(file.kind, draft);

  return {
    kind: file.kind,
    params: buildParams(file.kind, draft),
    title: subject ? `${base} · ${subject}` : base,
  };
}
