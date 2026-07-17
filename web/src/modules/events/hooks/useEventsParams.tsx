import type { EventType } from "@/modules/events/api/types";
import { EVENT_TYPES, EVENTS_DEFAULT_LIMIT } from "@/modules/events/constants";
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

function parseEventType(value: string): EventType | "" {
  return (EVENT_TYPES as readonly string[]).includes(value)
    ? (value as EventType)
    : "";
}

export function useEventsParams() {
  const [params, setParams] = useSearchParams();

  const dateParam = getParam(params, "date", "");
  const page = Number(getParam(params, "page", "1"));
  const limit = Number(
    getParam(params, "limit", String(EVENTS_DEFAULT_LIMIT)),
  );
  const department = getParam(params, "department", "");
  const type = parseEventType(getParam(params, "type", ""));

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

  const setLimit = (newLimit: number) =>
    updateSearchParams(
      params,
      { limit: String(newLimit), page: "1" },
      setParams,
    );

  const setDepartment = (newDepartment: string) =>
    updateSearchParams(
      params,
      { department: newDepartment, page: "1" },
      setParams,
    );

  const setType = (newType: EventType | "") =>
    updateSearchParams(params, { type: newType }, setParams);

  return {
    selectedDate,
    dateString,
    page,
    limit,
    department,
    type,
    setDate,
    setPage,
    setLimit,
    setDepartment,
    setType,
  };
}
