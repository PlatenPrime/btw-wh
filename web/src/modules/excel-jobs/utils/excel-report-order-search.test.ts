import type { ExcelJourneyInput } from "@/modules/excel-jobs/constants/excel-report-journey";
import { SKU_STOCK_EXCEL_METRICS } from "@/modules/excel-jobs/types/sku-stock-excel-metrics";
import {
  createDefaultExcelReportOrderSearch,
  parseExcelReportOrderSearch,
  sameSearchParams,
  writeExcelReportOrderSearch,
  type ExcelReportOrderSearchState,
} from "@/modules/excel-jobs/utils/excel-report-order-search";
import { describe, expect, it } from "vitest";

const NOW = new Date(2026, 9, 29);

function state(
  patch: Partial<Omit<ExcelReportOrderSearchState, "journey">> & {
    journey?: Partial<ExcelJourneyInput>;
  } = {},
): ExcelReportOrderSearchState {
  const base = createDefaultExcelReportOrderSearch(NOW);
  return {
    ...base,
    ...patch,
    journey: { ...base.journey, ...patch.journey },
  };
}

describe("excel report order search", () => {
  it("writes nothing for a fresh order and keeps foreign keys", () => {
    const params = writeExcelReportOrderSearch(
      new URLSearchParams("ref=1"),
      createDefaultExcelReportOrderSearch(NOW),
    );

    expect(params.toString()).toBe("ref=1");
  });

  it("roundtrips a competitor sales setup, including a comma in a group title", () => {
    const source = state({
      journey: {
        world: "konk",
        konk: "epicentr",
        scope: "konk-sku",
        measure: "sales",
        prod: "bosch",
        acked: ["sales-sort", "period", "skugr-ids", "sales-metrics"],
      },
      dateFrom: "2026-10-01",
      dateTo: "2026-10-29",
      salesMetrics: ["revenue", "sales"],
      salesSort: "revenue",
      skugrPicks: [
        {
          id: "g1",
          title: "Дриль, 18В",
          imageUrl: "https://cdn.example/a.png",
        },
      ],
    });

    const written = writeExcelReportOrderSearch(
      new URLSearchParams("ref=1"),
      source,
    );
    expect(written.get("ref")).toBe("1");
    expect(written.get("ack")).toBe(
      "period,sales-metrics,sales-sort,skugr-ids",
    );
    expect(written.get("sales")).toBe("sales,revenue");
    expect(written.get("sort")).toBe("revenue");
    expect(written.get("from")).toBe("2026-10-01");
    expect(written.get("to")).toBe("2026-10-29");
    expect(written.toString()).not.toContain("cdn.example");
    expect(JSON.parse(written.get("groups") ?? "")).toEqual([
      { id: "g1", title: "Дриль, 18В" },
    ]);

    const restored = parseExcelReportOrderSearch(
      new URLSearchParams(written.toString()),
      NOW,
    );
    expect(restored.journey.world).toBe("konk");
    expect(restored.journey.konk).toBe("epicentr");
    expect(restored.journey.prod).toBe("bosch");
    expect(restored.journey.acked).toEqual([
      "period",
      "sales-metrics",
      "sales-sort",
      "skugr-ids",
    ]);
    expect(restored.salesMetrics).toEqual(["sales", "revenue"]);
    expect(restored.salesSort).toBe("revenue");
    expect(restored.skugrPicks).toEqual([{ id: "g1", title: "Дриль, 18В" }]);
    expect(restored.journey.skuImageUrl).toBe("");

    const again = writeExcelReportOrderSearch(
      new URLSearchParams(written.toString()),
      restored,
    );
    expect(again.toString()).toBe(written.toString());

    const encoded = new URLSearchParams(written.toString().replace(/\+/g, "%20"));
    expect(sameSearchParams(encoded, written)).toBe(true);
  });

  it("writes none for an empty metric set and drops garbage", () => {
    const stock = state({
      journey: {
        world: "konk",
        konk: "epicentr",
        scope: "konk-sku",
        measure: "stock",
        prod: "bosch",
        acked: ["stock-metrics"],
      },
      stockMetrics: [],
    });
    const written = writeExcelReportOrderSearch(new URLSearchParams(), stock);
    expect(written.get("stock")).toBe("none");

    const restored = parseExcelReportOrderSearch(
      new URLSearchParams(written.toString()),
      NOW,
    );
    expect(restored.stockMetrics).toEqual([]);

    const garbage = parseExcelReportOrderSearch(
      new URLSearchParams(
        "world=nope&stock=bogus&from=2026-13-40&ack=nope,period&sales=none&ref=1",
      ),
      NOW,
    );
    expect(garbage.journey.world).toBe("");
    expect(garbage.journey.acked).toEqual(["period"]);
    expect(garbage.stockMetrics).toEqual([...SKU_STOCK_EXCEL_METRICS]);
    expect(garbage.salesMetrics).toEqual([]);
    expect(garbage.dateFrom).toBe("2026-10-01");
    expect(garbage.dateTo).toBe("2026-10-29");

    const kept = writeExcelReportOrderSearch(
      new URLSearchParams(
        "world=nope&stock=bogus&from=2026-13-40&ack=nope,period&sales=none&ref=1",
      ),
      garbage,
    );
    expect(kept.get("ref")).toBe("1");
    expect(kept.get("world")).toBeNull();
    expect(kept.get("stock")).toBeNull();
    expect(kept.get("from")).toBeNull();
    expect(kept.get("ack")).toBe("period");
    expect(kept.get("sales")).toBeNull();
  });
});
