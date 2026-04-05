import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { format } from "date-fns";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

export type CompetitorSkusScope = "all" | "invalid" | "new_since";

function parseScope(raw: string): CompetitorSkusScope {
  if (raw === "invalid" || raw === "new_since") return raw;
  return "all";
}

function defaultCreatedFrom(): string {
  const d = new Date();
  return format(new Date(d.getFullYear(), d.getMonth(), 1), "yyyy-MM-dd");
}

export function useCompetitorSkusParams() {
  const [params, setParams] = useSearchParams();

  const page = Number(getParam(params, "page", "1"));
  const limit = Number(getParam(params, "limit", "20"));
  const konkName = getParam(params, "konkName", "");
  const prodName = getParam(params, "prodName", "");
  const search = getParam(params, "search", "");
  const scope = parseScope(getParam(params, "scope", ""));
  const createdFromRaw = getParam(params, "createdFrom", "");

  const createdFrom =
    scope === "new_since"
      ? createdFromRaw || defaultCreatedFrom()
      : createdFromRaw;

  const setPage = (newPage: number) =>
    updateSearchParams(params, { page: String(newPage) }, setParams);

  const setLimit = (newLimit: number) =>
    updateSearchParams(params, { limit: String(newLimit), page: "1" }, setParams);

  const setSearch = (newSearch: string) =>
    updateSearchParams(params, { search: newSearch, page: "1" }, setParams);

  const setKonkName = (value: string) =>
    updateSearchParams(params, { konkName: value, page: "1" }, setParams);

  const setProdName = (value: string) =>
    updateSearchParams(params, { prodName: value, page: "1" }, setParams);

  const setScope = useCallback(
    (next: CompetitorSkusScope) => {
      if (next === "all") {
        updateSearchParams(
          params,
          { scope: "", createdFrom: "", page: "1" },
          setParams,
        );
        return;
      }
      if (next === "invalid") {
        updateSearchParams(
          params,
          { scope: "invalid", createdFrom: "", page: "1" },
          setParams,
        );
        return;
      }
      const from =
        getParam(params, "createdFrom", "") || defaultCreatedFrom();
      updateSearchParams(
        params,
        { scope: "new_since", createdFrom: from, page: "1" },
        setParams,
      );
    },
    [params, setParams],
  );

  const setCreatedFrom = (value: string) =>
    updateSearchParams(params, { createdFrom: value, page: "1" }, setParams);

  const listQuery = useMemo(() => {
    if (scope === "invalid") {
      return { isInvalid: true as const, createdFromForApi: undefined as string | undefined };
    }
    if (scope === "new_since") {
      return {
        isInvalid: undefined as boolean | undefined,
        createdFromForApi: createdFrom,
      };
    }
    return {
      isInvalid: undefined as boolean | undefined,
      createdFromForApi: undefined as string | undefined,
    };
  }, [scope, createdFrom]);

  return {
    page,
    limit,
    konkName,
    prodName,
    search,
    scope,
    createdFrom,
    setPage,
    setLimit,
    setSearch,
    setKonkName,
    setProdName,
    setScope,
    setCreatedFrom,
    listQuery,
  };
}
