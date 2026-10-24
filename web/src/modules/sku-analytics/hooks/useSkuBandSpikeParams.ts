import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

function parseOptionalNumber(value: string): number | null {
  if (!value.trim()) return null;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return null;
  return parsed;
}

export function useSkuBandSpikeParams() {
  const [params, setParams] = useSearchParams();

  const konk = getParam(params, "konk", "");
  const dateFrom = getParam(params, "dateFrom", "");
  const dateTo = getParam(params, "dateTo", "");
  const stockMinRaw = getParam(params, "stockMin", "");
  const stockMaxRaw = getParam(params, "stockMax", "");
  const hasRun = getParam(params, "run", "") === "1";

  const stockMin = parseOptionalNumber(stockMinRaw);
  const stockMax = parseOptionalNumber(stockMaxRaw);

  const setKonk = (value: string) =>
    updateSearchParams(params, { konk: value, run: "" }, setParams);

  const setDateRange = (from: string, to: string) =>
    updateSearchParams(
      params,
      { dateFrom: from, dateTo: to, run: "" },
      setParams,
    );

  const setStockBand = (min: string, max: string) =>
    updateSearchParams(
      params,
      { stockMin: min, stockMax: max, run: "" },
      setParams,
    );

  const markRun = () => updateSearchParams(params, { run: "1" }, setParams);

  return {
    konk,
    dateFrom,
    dateTo,
    stockMin,
    stockMax,
    stockMinRaw,
    stockMaxRaw,
    hasRun,
    setKonk,
    setDateRange,
    setStockBand,
    markRun,
  };
}
