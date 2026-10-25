import { getParam } from "@/utils/getParam";
import { format, isValid, parse } from "date-fns";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

const DATE_API_FORMAT = "yyyy-MM-dd";

function parseApiDate(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = parse(value, DATE_API_FORMAT, new Date());
  return isValid(parsed) ? parsed : undefined;
}

function applyUpdates(
  prev: URLSearchParams,
  updates: Record<string, string>,
): URLSearchParams {
  const next = new URLSearchParams(prev);
  let changed = false;
  for (const [key, value] of Object.entries(updates)) {
    const current = next.get(key) ?? "";
    if (value === "") {
      if (next.has(key)) {
        next.delete(key);
        changed = true;
      }
    } else if (current !== value) {
      next.set(key, value);
      changed = true;
    }
  }
  return changed ? next : prev;
}

export type KasksDraftParams = {
  artikul?: string;
  quant?: string;
  com?: string;
};

export function useKasksParams() {
  const [params, setParams] = useSearchParams();

  const dateParam = getParam(params, "date", "");
  const artikul = getParam(params, "artikul", "");
  const quant = getParam(params, "quant", "");
  const com = getParam(params, "com", "");

  const selectedDate = useMemo(
    () => parseApiDate(dateParam) ?? new Date(),
    [dateParam],
  );

  const dateString = format(selectedDate, DATE_API_FORMAT);

  const setDate = useCallback(
    (date: Date) => {
      setParams((prev) =>
        applyUpdates(prev, { date: format(date, DATE_API_FORMAT) }),
      );
    },
    [setParams],
  );

  const setDraft = useCallback(
    (draft: KasksDraftParams) => {
      const updates: Record<string, string> = {};
      if (draft.artikul !== undefined) updates.artikul = draft.artikul.trim();
      if (draft.quant !== undefined) updates.quant = draft.quant.trim();
      if (draft.com !== undefined) updates.com = draft.com;
      if (Object.keys(updates).length === 0) return;
      setParams((prev) => applyUpdates(prev, updates));
    },
    [setParams],
  );

  const clearDraft = useCallback(() => {
    setParams((prev) =>
      applyUpdates(prev, { artikul: "", quant: "", com: "" }),
    );
  }, [setParams]);

  return {
    selectedDate,
    dateString,
    setDate,
    artikul,
    quant,
    com,
    setDraft,
    clearDraft,
  };
}
