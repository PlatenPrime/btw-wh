import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useZonesParams() {
  const [params, setParams] = useSearchParams();

  const page = Number(getParam(params, "page", "1"));
  const search = getParam(params, "search", "");
  const limit = Number(getParam(params, "limit", "20"));
  const sortBy = getParam(params, "sortBy", "sector") as "title" | "bar" | "sector" | "createdAt";
  const sortOrder = getParam(params, "sortOrder", "asc") as "asc" | "desc";

  const setPage = (newPage: number) =>
    updateSearchParams(params, { page: String(newPage) }, setParams);

  const setSearch = (newSearch: string) =>
    updateSearchParams(params, { search: newSearch, page: "1" }, setParams);

  const setLimit = (newLimit: number) =>
    updateSearchParams(
      params,
      { limit: String(newLimit), page: "1" },
      setParams,
    );

  const setSortBy = (newSortBy: "title" | "bar" | "sector" | "createdAt") =>
    updateSearchParams(params, { sortBy: newSortBy, page: "1" }, setParams);

  const setSortOrder = (newSortOrder: "asc" | "desc") =>
    updateSearchParams(params, { sortOrder: newSortOrder, page: "1" }, setParams);

  return {
    page,
    search,
    limit,
    sortBy,
    sortOrder,
    setPage,
    setSearch,
    setLimit,
    setSortBy,
    setSortOrder,
  };
}

