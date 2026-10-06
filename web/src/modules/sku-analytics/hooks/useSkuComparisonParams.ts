import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

function parseExcludeKonksParam(raw: string): string[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function useSkuComparisonParams() {
  const [params, setParams] = useSearchParams();

  const prod = getParam(params, "prod", "");
  const dateFrom = getParam(params, "dateFrom", "");
  const dateTo = getParam(params, "dateTo", "");
  const excludeKonksParam = getParam(params, "excludeKonks", "");

  const excludeKonks = useMemo(
    () => parseExcludeKonksParam(excludeKonksParam),
    [excludeKonksParam],
  );

  const setProd = (value: string) =>
    updateSearchParams(
      params,
      { prod: value, excludeKonks: "" },
      setParams,
    );

  const setDateRange = (from: string, to: string) =>
    updateSearchParams(params, { dateFrom: from, dateTo: to }, setParams);

  const setExcludeKonks = (names: string[]) => {
    const csv = names
      .map((name) => name.trim())
      .filter(Boolean)
      .join(",");
    updateSearchParams(params, { excludeKonks: csv }, setParams);
  };

  return {
    prod,
    dateFrom,
    dateTo,
    excludeKonks,
    setProd,
    setDateRange,
    setExcludeKonks,
  };
}
