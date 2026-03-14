import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useStockParams() {
  const [params, setParams] = useSearchParams();

  const konk = getParam(params, "konk", "");
  const prod = getParam(params, "prod", "");
  const dateFrom = getParam(params, "dateFrom", "");
  const dateTo = getParam(params, "dateTo", "");

  const setKonk = (value: string) =>
    updateSearchParams(params, { konk: value }, setParams);

  const setProd = (value: string) =>
    updateSearchParams(params, { prod: value }, setParams);

  const setDateRange = (from: string, to: string) =>
    updateSearchParams(params, { dateFrom: from, dateTo: to }, setParams);

  return {
    konk,
    prod,
    dateFrom,
    dateTo,
    setKonk,
    setProd,
    setDateRange,
  };
}
