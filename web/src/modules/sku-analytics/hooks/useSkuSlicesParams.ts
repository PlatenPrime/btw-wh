import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { format, isValid, parse } from "date-fns";
import { useMemo } from "react";
import { useSearchParams } from "react-router";

const DATE_API_FORMAT = "yyyy-MM-dd";

function parseApiDate(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = parse(value, DATE_API_FORMAT, new Date());
  return isValid(parsed) ? parsed : undefined;
}

export function useSkuSlicesParams() {
  const [params, setParams] = useSearchParams();

  const konk = getParam(params, "konk", "");
  const dateParam = getParam(params, "date", "");
  const page = Number(getParam(params, "page", "1")) || 1;
  const showInvalidOnly = getParam(params, "invalid", "") === "1";

  const date = useMemo(() => {
    const parsed = parseApiDate(dateParam);
    return format(parsed ?? new Date(), DATE_API_FORMAT);
  }, [dateParam]);

  const setKonk = (value: string) =>
    updateSearchParams(params, { konk: value, page: "1" }, setParams);

  const setDate = (value: string) =>
    updateSearchParams(params, { date: value, page: "1" }, setParams);

  const setPage = (newPage: number) =>
    updateSearchParams(params, { page: String(newPage) }, setParams);

  const setShowInvalidOnly = (value: boolean) =>
    updateSearchParams(
      params,
      { invalid: value ? "1" : "", page: "1" },
      setParams,
    );

  return {
    konk,
    date,
    page,
    showInvalidOnly,
    setKonk,
    setDate,
    setPage,
    setShowInvalidOnly,
  };
}
