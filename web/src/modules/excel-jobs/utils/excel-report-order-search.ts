import type { SkladCode } from "@/constants/sklad";
import {
  EXCEL_JOURNEY_WORLDS,
  createEmptyJourney,
  resolveExcelJourney,
  type ExcelJourneyInput,
  type ExcelJourneyWorld,
} from "@/modules/excel-jobs/constants/excel-report-journey";
import {
  DEFAULT_SKU_SALES_EXCEL_METRICS,
  normalizeSkuSalesExcelMetrics,
} from "@/modules/excel-jobs/constants/sku-sales-excel-metrics";
import {
  DEFAULT_SKU_STOCK_EXCEL_METRICS,
  normalizeSkuStockExcelMetrics,
} from "@/modules/excel-jobs/constants/sku-stock-excel-metrics";
import {
  SKU_SALES_EXCEL_METRICS,
  type SkuSalesExcelMetric,
} from "@/modules/excel-jobs/types/sku-sales-excel-metrics";
import {
  SKU_STOCK_EXCEL_METRICS,
  type SkuStockExcelMetric,
} from "@/modules/excel-jobs/types/sku-stock-excel-metrics";
import type { ExcelSalesSort } from "@/modules/excel-jobs/utils/build-excel-job-request";
import { format, isValid, parse } from "date-fns";

const ISO_DATE = "yyyy-MM-dd";
const NONE = "none";

const OWNED_KEYS = [
  "world",
  "btrade",
  "warehouse",
  "konk",
  "scope",
  "measure",
  "prod",
  "sku",
  "skuTitle",
  "skugrId",
  "skugrTitle",
  "analog",
  "analogTitle",
  "art",
  "artTitle",
  "ack",
  "from",
  "to",
  "since",
  "stock",
  "sales",
  "sort",
  "groups",
  "abc",
  "abcSort",
  "sklad",
] as const;

const ACK_IDS = [
  "period",
  "stock-metrics",
  "sales-metrics",
  "sales-sort",
  "skugr-ids",
  "abc",
  "sklad",
] as const;

const BTRADE_REPORTS = new Set([
  "art-stock",
  "art-sales",
  "arts-export",
  "arts-export-with-stocks",
  "arts-export-keys",
]);

const WAREHOUSE_REPORTS = new Set(["zones-export", "poses-export-stocks"]);

const SCOPES = new Set([
  "catalog",
  "sku",
  "skugr",
  "konk-sku",
]);

const MEASURES = new Set([
  "stock",
  "sales",
  "new-since",
  "invalid",
]);

const ABC_LETTERS = new Set(["A", "B", "C", "D"]);
const SKLADS = new Set<SkladCode>(["pogrebi", "merezhi"]);
const SALES_SORTS = new Set<ExcelSalesSort>(["sales", "revenue"]);

function hasControlChar(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    if (value.charCodeAt(index) <= 31) return true;
  }
  return false;
}

export interface ExcelReportOrderGroupPick {
  id: string;
  title: string;
  imageUrl?: string;
}

export interface ExcelReportOrderSearchState {
  journey: ExcelJourneyInput;
  dateFrom: string;
  dateTo: string;
  since: string;
  stockMetrics: SkuStockExcelMetric[];
  salesMetrics: SkuSalesExcelMetric[];
  salesSort: ExcelSalesSort;
  skugrPicks: ExcelReportOrderGroupPick[];
  abc: string;
  sortByAbc: boolean;
  sklad: SkladCode | null;
}

export function createDefaultExcelReportOrderSearch(
  now = new Date(),
): ExcelReportOrderSearchState {
  const start = format(new Date(now.getFullYear(), now.getMonth(), 1), ISO_DATE);
  const today = format(now, ISO_DATE);
  return {
    journey: createEmptyJourney(),
    dateFrom: start,
    dateTo: today,
    since: start,
    stockMetrics: [...DEFAULT_SKU_STOCK_EXCEL_METRICS],
    salesMetrics: [...DEFAULT_SKU_SALES_EXCEL_METRICS],
    salesSort: "default",
    skugrPicks: [],
    abc: "",
    sortByAbc: false,
    sklad: null,
  };
}

export function parseExcelReportOrderSearch(
  params: URLSearchParams,
  now = new Date(),
): ExcelReportOrderSearchState {
  const defaults = createDefaultExcelReportOrderSearch(now);
  const from = readDate(params.get("from"));
  const to = readDate(params.get("to"));
  const since = readDate(params.get("since"));
  const range =
    from && to && from <= to
      ? { dateFrom: from, dateTo: to }
      : { dateFrom: defaults.dateFrom, dateTo: defaults.dateTo };

  return {
    ...defaults,
    ...range,
    since: since ?? defaults.since,
    journey: readJourney(params),
    stockMetrics: readMetrics(
      params.get("stock"),
      SKU_STOCK_EXCEL_METRICS,
      normalizeSkuStockExcelMetrics,
      defaults.stockMetrics,
    ),
    salesMetrics: readMetrics(
      params.get("sales"),
      SKU_SALES_EXCEL_METRICS,
      normalizeSkuSalesExcelMetrics,
      defaults.salesMetrics,
    ),
    salesSort: readSalesSort(params.get("sort")),
    skugrPicks: readGroups(params.get("groups")),
    abc: readAbc(params.get("abc")),
    sortByAbc: params.get("abcSort") === "1",
    sklad: readSklad(params.get("sklad")),
  };
}

export function sameSearchParams(
  left: URLSearchParams,
  right: URLSearchParams,
): boolean {
  const keys = new Set([...left.keys(), ...right.keys()]);
  for (const key of keys) {
    const leftValues = left.getAll(key);
    const rightValues = right.getAll(key);
    if (
      leftValues.length !== rightValues.length ||
      leftValues.some((value, index) => value !== rightValues[index])
    ) {
      return false;
    }
  }
  return true;
}

export function writeExcelReportOrderSearch(
  current: URLSearchParams,
  state: ExcelReportOrderSearchState,
): URLSearchParams {
  const next = new URLSearchParams(current);
  for (const key of OWNED_KEYS) next.delete(key);

  const journey = state.journey;
  const steps = resolveExcelJourney(journey);
  setText(next, "world", journey.world);
  setText(next, "btrade", journey.btradeReport);
  setText(next, "warehouse", journey.whReport);
  setText(next, "konk", journey.konk);
  setText(next, "scope", journey.scope);
  setText(next, "measure", journey.measure);
  setText(next, "prod", journey.prod);
  setText(next, "sku", journey.skuId);
  setText(next, "skuTitle", journey.skuId ? journey.skuTitle : "");
  setText(next, "skugrId", journey.skugrId);
  setText(next, "skugrTitle", journey.skugrId ? journey.skugrTitle : "");
  setText(next, "art", journey.artikul);
  setText(next, "artTitle", journey.artikul ? journey.artTitle : "");

  const ack = ACK_IDS.filter((id) => journey.acked.includes(id));
  if (ack.length > 0) next.set("ack", ack.join(","));

  const period = steps.find((step) => step.type === "period");
  if (period?.type === "period" && period.mode === "since") {
    setText(next, "since", readDate(state.since) ?? "");
  } else if (period?.type === "period") {
    const from = readDate(state.dateFrom);
    const to = readDate(state.dateTo);
    if (from && to && from <= to) {
      next.set("from", from);
      next.set("to", to);
    }
  }

  if (steps.some((step) => step.type === "stock-metrics")) {
    writeMetricList(
      next,
      "stock",
      normalizeSkuStockExcelMetrics(state.stockMetrics),
      DEFAULT_SKU_STOCK_EXCEL_METRICS,
    );
  }
  if (steps.some((step) => step.type === "sales-metrics")) {
    writeMetricList(
      next,
      "sales",
      normalizeSkuSalesExcelMetrics(state.salesMetrics),
      DEFAULT_SKU_SALES_EXCEL_METRICS,
    );
  }
  if (
    steps.some((step) => step.type === "sales-sort") &&
    state.salesSort !== "default"
  ) {
    next.set("sort", state.salesSort);
  }
  if (steps.some((step) => step.type === "skugr-ids") && state.skugrPicks.length > 0) {
    next.set(
      "groups",
      JSON.stringify(
        state.skugrPicks.map((pick) => ({ id: pick.id, title: pick.title })),
      ),
    );
  }
  if (steps.some((step) => step.type === "abc")) {
    setText(next, "abc", state.abc);
    if (state.sortByAbc) next.set("abcSort", "1");
  }
  if (steps.some((step) => step.type === "sklad") && state.sklad) {
    next.set("sklad", state.sklad);
  }

  return next;
}

function readJourney(params: URLSearchParams): ExcelJourneyInput {
  const world = readWorld(params.get("world"));
  return {
    ...createEmptyJourney(),
    world,
    btradeReport: readToken(params.get("btrade"), BTRADE_REPORTS),
    whReport: readToken(params.get("warehouse"), WAREHOUSE_REPORTS),
    konk: readFreeText(params.get("konk"), 120),
    scope: readToken(params.get("scope"), SCOPES),
    measure: readToken(params.get("measure"), MEASURES),
    prod: readFreeText(params.get("prod"), 120),
    skuId: readFreeText(params.get("sku"), 120),
    skuTitle: readFreeText(params.get("skuTitle"), 300),
    skugrId: readFreeText(params.get("skugrId"), 120),
    skugrTitle: readFreeText(params.get("skugrTitle"), 300),
    artikul: readFreeText(params.get("art"), 120),
    artTitle: readFreeText(params.get("artTitle"), 300),
    acked: readAck(params.get("ack")),
  };
}

function readWorld(value: string | null): ExcelJourneyWorld | "" {
  if (!value) return "";
  return EXCEL_JOURNEY_WORLDS.includes(value as ExcelJourneyWorld)
    ? (value as ExcelJourneyWorld)
    : "";
}

function readToken(value: string | null, allowed: ReadonlySet<string>): string {
  const text = value?.trim() ?? "";
  return allowed.has(text) ? text : "";
}

function readFreeText(value: string | null, max: number): string {
  const text = value?.trim() ?? "";
  if (!text || text.length > max || hasControlChar(text)) return "";
  return text;
}

function readAck(value: string | null): string[] {
  if (!value) return [];
  const found = new Set(
    value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => ACK_IDS.includes(item as (typeof ACK_IDS)[number])),
  );
  return ACK_IDS.filter((id) => found.has(id));
}

function readDate(value: string | null): string | null {
  const text = value?.trim() ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return null;
  const parsed = parse(text, ISO_DATE, new Date());
  if (!isValid(parsed) || format(parsed, ISO_DATE) !== text) return null;
  return text;
}

function readMetrics<T extends string>(
  value: string | null,
  allowed: readonly T[],
  normalize: (metrics: readonly T[]) => T[],
  fallback: T[],
): T[] {
  if (value === null || value.trim() === "") return [...fallback];
  if (value.trim() === NONE) return [];
  const known = new Set<string>(allowed);
  const picked = value
    .split(",")
    .map((item) => item.trim())
    .filter((item): item is T => known.has(item));
  if (picked.length === 0) return [...fallback];
  return normalize(picked);
}

function readSalesSort(value: string | null): ExcelSalesSort {
  const text = value?.trim() ?? "";
  return SALES_SORTS.has(text as ExcelSalesSort)
    ? (text as ExcelSalesSort)
    : "default";
}

function readAbc(value: string | null): string {
  const text = value?.trim() ?? "";
  return ABC_LETTERS.has(text) ? text : "";
}

function readSklad(value: string | null): SkladCode | null {
  const text = value?.trim() ?? "";
  return SKLADS.has(text as SkladCode) ? (text as SkladCode) : null;
}

function readGroups(value: string | null): ExcelReportOrderGroupPick[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    const picks: ExcelReportOrderGroupPick[] = [];
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const record = item as { id?: unknown; title?: unknown };
      const id = typeof record.id === "string" ? readFreeText(record.id, 120) : "";
      if (!id) continue;
      const title =
        typeof record.title === "string" ? readFreeText(record.title, 300) : "";
      picks.push({ id, title });
    }
    return picks;
  } catch {
    return [];
  }
}

function writeMetricList(
  params: URLSearchParams,
  key: string,
  metrics: readonly string[],
  defaults: readonly string[],
) {
  if (metrics.length === 0) {
    params.set(key, NONE);
    return;
  }
  if (metrics.join(",") === defaults.join(",")) return;
  params.set(key, metrics.join(","));
}

function setText(params: URLSearchParams, key: string, value: string) {
  if (value) params.set(key, value);
}
