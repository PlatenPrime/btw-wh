import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useSkuPackFlipsParams() {
  const [params, setParams] = useSearchParams();

  const konk = getParam(params, "konk", "");
  const dateFrom = getParam(params, "dateFrom", "");
  const dateTo = getParam(params, "dateTo", "");
  const hasRun = getParam(params, "run", "") === "1";

  const setKonk = (value: string) =>
    updateSearchParams(params, { konk: value, run: "" }, setParams);

  const setDateRange = (from: string, to: string) =>
    updateSearchParams(
      params,
      { dateFrom: from, dateTo: to, run: "" },
      setParams,
    );

  const markRun = () => updateSearchParams(params, { run: "1" }, setParams);

  return {
    konk,
    dateFrom,
    dateTo,
    hasRun,
    setKonk,
    setDateRange,
    markRun,
  };
}
