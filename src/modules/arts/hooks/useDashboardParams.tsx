import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useDashboardParams() {
  const [params, setParams] = useSearchParams();

  const page = Number(getParam(params, "page", "1"));
  const search = getParam(params, "search", "");
  const limit = Number(getParam(params, "limit", "10"));

  const setPage = (newPage: number) =>
    updateSearchParams(params, { page: String(newPage) }, setParams);

  const setSearch = (newSearch: string) =>
    updateSearchParams(params, { search: newSearch, page: "1" }, setParams);

  const setLimit = (newLimit: number) =>
    updateSearchParams(params, { limit: String(newLimit), page: "1" }, setParams);

  return { page, search, limit, setPage, setSearch, setLimit };
}
