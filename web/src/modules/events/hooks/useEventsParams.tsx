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

export function useEventsParams() {
  const [params, setParams] = useSearchParams();

  const dateParam = getParam(params, "date", "");
  const page = Number(getParam(params, "page", "1"));
  const limit = Number(getParam(params, "limit", "20"));

  const selectedDate = useMemo(
    () => parseApiDate(dateParam) ?? new Date(),
    [dateParam],
  );

  const dateString = format(selectedDate, DATE_API_FORMAT);

  const setDate = (date: Date) =>
    updateSearchParams(
      params,
      { date: format(date, DATE_API_FORMAT), page: "1" },
      setParams,
    );

  const setPage = (newPage: number) =>
    updateSearchParams(params, { page: String(newPage) }, setParams);

  return {
    selectedDate,
    dateString,
    page,
    limit,
    setDate,
    setPage,
  };
}
