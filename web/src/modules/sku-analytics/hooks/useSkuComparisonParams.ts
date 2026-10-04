import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useSkuComparisonParams() {
  const [params, setParams] = useSearchParams();

  const prod = getParam(params, "prod", "");
  const dateFrom = getParam(params, "dateFrom", "");
  const dateTo = getParam(params, "dateTo", "");

  const setProd = (value: string) =>
    updateSearchParams(params, { prod: value }, setParams);

  const setDateRange = (from: string, to: string) =>
    updateSearchParams(params, { dateFrom: from, dateTo: to }, setParams);

  return {
    prod,
    dateFrom,
    dateTo,
    setProd,
    setDateRange,
  };
}
