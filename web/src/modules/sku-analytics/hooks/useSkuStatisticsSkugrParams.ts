import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useSkuStatisticsSkugrParams() {
  const [params, setParams] = useSearchParams();

  const skugrId = getParam(params, "skugrId", "");
  const dateFrom = getParam(params, "dateFrom", "");
  const dateTo = getParam(params, "dateTo", "");
  const konk = getParam(params, "konk", "");
  const prod = getParam(params, "prod", "");

  const setDateRange = (from: string, to: string) =>
    updateSearchParams(params, { dateFrom: from, dateTo: to }, setParams);

  return {
    skugrId,
    dateFrom,
    dateTo,
    konk,
    prod,
    setDateRange,
  };
}
