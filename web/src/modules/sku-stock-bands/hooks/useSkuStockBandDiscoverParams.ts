import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useSkuStockBandDiscoverParams() {
  const [params, setParams] = useSearchParams();

  const dateFrom = getParam(params, "dateFrom", "");
  const dateTo = getParam(params, "dateTo", "");
  const hasRun = getParam(params, "run", "") === "1";

  const setDateRange = (from: string, to: string) =>
    updateSearchParams(
      params,
      { dateFrom: from, dateTo: to, run: "" },
      setParams,
    );

  const markRun = () => updateSearchParams(params, { run: "1" }, setParams);

  return {
    dateFrom,
    dateTo,
    hasRun,
    setDateRange,
    markRun,
  };
}
