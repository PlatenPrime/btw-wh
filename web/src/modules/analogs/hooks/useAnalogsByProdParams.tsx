import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useAnalogsByProdParams() {
  const [params, setParams] = useSearchParams();

  const page = Number(getParam(params, "page", "1"));
  const limit = Number(getParam(params, "limit", "10"));
  const search = getParam(params, "search", "");

  const setPage = (newPage: number) =>
    updateSearchParams(params, { page: String(newPage) }, setParams);

  const setLimit = (newLimit: number) =>
    updateSearchParams(params, { limit: String(newLimit), page: "1" }, setParams);

  const setSearch = (newSearch: string) =>
    updateSearchParams(params, { search: newSearch, page: "1" }, setParams);

  return {
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
  };
}
