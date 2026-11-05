import { describe, expect, it } from "vitest";
import type { ExcelReportOrderDraft } from "@/modules/excel-jobs/utils/build-excel-job-request";
import {
  buildExcelJobRequest,
  isExcelReportOrderReady,
} from "@/modules/excel-jobs/utils/build-excel-job-request";
import { SKU_SALES_EXCEL_METRICS } from "@/modules/excel-jobs/types/sku-sales-excel-metrics";
import { SKU_STOCK_EXCEL_METRICS } from "@/modules/excel-jobs/types/sku-stock-excel-metrics";

function draft(
  patch: Partial<ExcelReportOrderDraft> = {},
): ExcelReportOrderDraft {
  return {
    objectId: "",
    fileId: "",
    konk: "",
    prod: "",
    skuId: "",
    skuTitle: "",
    skuIds: [],
    skuSelectAll: false,
    skuSelectionSearch: "",
    skuSelectionKonkName: "",
    skuSelectionProdName: "",
    skuMatchedTotal: 0,
    skugrId: "",
    skugrTitle: "",
    analogId: "",
    analogTitle: "",
    artikul: "",
    artTitle: "",
    dateFrom: "2026-10-01",
    dateTo: "2026-10-29",
    since: "2026-10-01",
    stockMetrics: [...SKU_STOCK_EXCEL_METRICS],
    salesMetrics: [...SKU_SALES_EXCEL_METRICS],
    salesSort: "default",
    skugrIds: [],
    abc: "",
    sortByAbc: false,
    sklad: null,
    includeImages: false,
    ...patch,
  };
}

describe("buildExcelJobRequest", () => {
  it("builds sku-selection-sales with skuIds", () => {
    expect(
      buildExcelJobRequest(
        draft({
          objectId: "sku-selection",
          fileId: "sales",
          skuIds: ["aaaaaaaaaaaaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbbbbbb"],
          salesMetrics: ["sales", "revenue"],
        }),
      ),
    ).toEqual({
      kind: "sku-selection-sales",
      params: {
        skuIds: ["aaaaaaaaaaaaaaaaaaaaaaaa", "bbbbbbbbbbbbbbbbbbbbbbbb"],
        dateFrom: "2026-10-01",
        dateTo: "2026-10-29",
        metrics: ["sales", "revenue"],
      },
      title: "SKU (обрані): продажі · 2 SKU",
    });
  });

  it("builds sku-selection-stock selectAll without skuIds and with images", () => {
    expect(
      buildExcelJobRequest(
        draft({
          objectId: "sku-selection",
          fileId: "stock",
          skuSelectAll: true,
          skuIds: ["aaaaaaaaaaaaaaaaaaaaaaaa"],
          skuSelectionSearch: "Happy Birthday",
          skuSelectionKonkName: "ivvo",
          skuMatchedTotal: 12,
          stockMetrics: ["stock", "price"],
          includeImages: true,
        }),
      ),
    ).toEqual({
      kind: "sku-selection-stock",
      params: {
        selectAll: true,
        search: "Happy Birthday",
        konkName: "ivvo",
        dateFrom: "2026-10-01",
        dateTo: "2026-10-29",
        metrics: ["stock", "price"],
        includeImages: true,
      },
      title: "SKU (обрані): залишки · усі (12) SKU",
    });
  });

  it("omits includeImages when false for konk sales", () => {
    const params = buildExcelJobRequest(
      draft({
        objectId: "konk-sku",
        fileId: "sales",
        konk: "ivvo",
        prod: "APT-SHOW",
        includeImages: false,
      }),
    )?.params;

    expect(params).toEqual({
      konk: "ivvo",
      prod: "APT-SHOW",
      dateFrom: "2026-10-01",
      dateTo: "2026-10-29",
      metrics: ["sales", "price", "revenue"],
    });
    expect(params).not.toHaveProperty("includeImages");
  });

  it("sends includeImages for skugr stock when enabled", () => {
    expect(
      buildExcelJobRequest(
        draft({
          objectId: "skugr",
          fileId: "stock",
          skugrId: "cccccccccccccccccccccccc",
          skugrTitle: "Група",
          includeImages: true,
        }),
      )?.params,
    ).toMatchObject({
      skugrId: "cccccccccccccccccccccccc",
      includeImages: true,
    });
  });

  it("sends an empty body for a directory export", () => {
    expect(
      buildExcelJobRequest(
        draft({ objectId: "directory", fileId: "arts-export", skuTitle: "leak" }),
      ),
    ).toEqual({
      kind: "arts-export",
      params: {},
      title: "Експорт артикулів",
    });
  });

  it("omits sklad until a warehouse is chosen", () => {
    expect(
      buildExcelJobRequest(
        draft({ objectId: "directory", fileId: "poses-export-stocks" }),
      )?.params,
    ).toEqual({});

    expect(
      buildExcelJobRequest(
        draft({
          objectId: "directory",
          fileId: "poses-export-stocks",
          sklad: "merezhi",
        }),
      ),
    ).toMatchObject({
      kind: "poses-export-stocks",
      params: { sklad: "merezhi" },
      title: "Залишки позицій · Мережі",
    });
  });

  it("keeps sku sales metrics and drops a stale konk", () => {
    const request = buildExcelJobRequest(
      draft({
        objectId: "sku",
        fileId: "sales",
        skuId: "sku-1",
        skuTitle: "Дриль",
        konk: "rozetka",
      }),
    );

    expect(request).toEqual({
      kind: "sku-one-sales",
      params: {
        skuId: "sku-1",
        dateFrom: "2026-10-01",
        dateTo: "2026-10-29",
        metrics: ["sales", "price", "revenue"],
      },
      title: "SKU: продажі · Дриль",
    });
  });

  it("blocks sku stock when every metric is off", () => {
    const value = draft({
      objectId: "sku",
      fileId: "stock",
      skuId: "sku-1",
      stockMetrics: [],
    });
    expect(isExcelReportOrderReady(value)).toBe(false);
    expect(buildExcelJobRequest(value)).toBeNull();
  });

  it("omits optional konk sales filters until they are set", () => {
    const base = draft({
      objectId: "konk-sku",
      fileId: "sales",
      konk: "rozetka",
      prod: "bosch",
    });

    expect(buildExcelJobRequest(base)?.params).toEqual({
      konk: "rozetka",
      prod: "bosch",
      dateFrom: "2026-10-01",
      dateTo: "2026-10-29",
      metrics: ["sales", "price", "revenue"],
    });

    expect(
      buildExcelJobRequest({
        ...base,
        salesSort: "revenue",
        skugrIds: ["g1"],
      })?.params,
    ).toMatchObject({
      sortBy: "revenue",
      skugrIds: ["g1"],
    });
  });

  it("sends artikul for an article report", () => {
    expect(
      buildExcelJobRequest(
        draft({
          objectId: "art",
          fileId: "stock",
          artikul: "12345",
          artTitle: "Перфоратор",
        }),
      ),
    ).toMatchObject({
      kind: "art-stock",
      params: {
        artikul: "12345",
        dateFrom: "2026-10-01",
        dateTo: "2026-10-29",
      },
    });
  });

  it("rejects an inverted period and a file from another object", () => {
    expect(
      buildExcelJobRequest(
        draft({
          objectId: "art",
          fileId: "stock",
          artikul: "12345",
          dateFrom: "2026-10-20",
          dateTo: "2026-10-01",
        }),
      ),
    ).toBeNull();

    expect(
      buildExcelJobRequest(
        draft({ objectId: "catalog", fileId: "stock", konk: "all" }),
      ),
    ).toBeNull();
  });

  it("accepts catalog all-konks and a since date", () => {
    expect(
      buildExcelJobRequest(
        draft({
          objectId: "catalog",
          fileId: "new-since",
          konk: "all",
          since: "2026-10-01",
        }),
      )?.params,
    ).toEqual({ konk: "all", since: "2026-10-01" });
  });
});
