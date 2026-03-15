import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useSalesParams() {
  const [params, setParams] = useSearchParams();

  const konk = getParam(params, "konk", "");
  const prod = getParam(params, "prod", "");
  const dateFrom = getParam(params, "dateFrom", "");
  const dateTo = getParam(params, "dateTo", "");
  const abc = getParam(params, "abc", "");

  const setKonk = (value: string) =>
    updateSearchParams(params, { konk: value }, setParams);

  const setProd = (value: string) =>
    updateSearchParams(params, { prod: value }, setParams);

  const setDateRange = (from: string, to: string) =>
    updateSearchParams(params, { dateFrom: from, dateTo: to }, setParams);

  const setAbc = (value: string) =>
    updateSearchParams(params, { abc: value }, setParams);

  return {
    konk,
    prod,
    dateFrom,
    dateTo,
    abc,
    setKonk,
    setProd,
    setDateRange,
    setAbc,
  };
}
