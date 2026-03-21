import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useSkugrsParams() {
  const [params, setParams] = useSearchParams();

  const page = Number(getParam(params, "page", "1"));
  const limit = Number(getParam(params, "limit", "20"));
  const konkName = getParam(params, "konkName", "");
  const prodName = getParam(params, "prodName", "");
  const search = getParam(params, "search", "");

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

  return {
    page,
    limit,
    konkName,
    prodName,
    search,
    setPage,
    setLimit,
    setSearch,
    setKonkName,
    setProdName,
  };
}
