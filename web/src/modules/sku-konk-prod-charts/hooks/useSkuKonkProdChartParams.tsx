import { SKU_KONK_PROD_QUERY_ALL } from "@/modules/sku-konk-prod-charts/constants";
import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

function parseSkugrIdsParam(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function useSkuKonkProdChartParams() {
  const [params, setParams] = useSearchParams();

  const konk = getParam(params, "konk", "");
  const prod = getParam(params, "prod", "");
  const dateFrom = getParam(params, "dateFrom", "");
  const dateTo = getParam(params, "dateTo", "");
  const skugrIdsParam = getParam(params, "skugrIds", "");

  const skugrIds = useMemo(
    () => parseSkugrIdsParam(skugrIdsParam),
    [skugrIdsParam],
  );

  const setKonk = (value: string) =>
    updateSearchParams(params, { konk: value, skugrIds: "" }, setParams);

  const setProd = (value: string) => {
    const isSpecificProd = (v: string) =>
      Boolean(v) && v !== SKU_KONK_PROD_QUERY_ALL;
    const updates: Record<string, string> = { prod: value };
    if (
      isSpecificProd(prod) &&
      isSpecificProd(value) &&
      prod !== value
    ) {
      updates.skugrIds = "";
    }
    updateSearchParams(params, updates, setParams);
  };

  const setDateRange = (from: string, to: string) =>
    updateSearchParams(params, { dateFrom: from, dateTo: to }, setParams);

  const setSkugrIds = (ids: string[]) => {
    const csv = ids
      .map((id) => id.trim())
      .filter(Boolean)
      .join(",");
    updateSearchParams(params, { skugrIds: csv }, setParams);
  };

  return {
    konk,
    prod,
    dateFrom,
    dateTo,
    skugrIds,
    setKonk,
    setProd,
    setDateRange,
    setSkugrIds,
  };
}
