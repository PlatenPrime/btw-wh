import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useSkusBySkugrParams() {
  const [params, setParams] = useSearchParams();

  const page = Number(getParam(params, "grPage", "1"));
  const limit = Number(getParam(params, "grLimit", "10"));
  const search = getParam(params, "grSearch", "");

  const setPage = (newPage: number) =>
    updateSearchParams(params, { grPage: String(newPage) }, setParams);

  const setLimit = (newLimit: number) =>
    updateSearchParams(
      params,
      { grLimit: String(newLimit), grPage: "1" },
      setParams,
    );

  const setSearch = (newSearch: string) =>
    updateSearchParams(
      params,
      { grSearch: newSearch, grPage: "1" },
      setParams,
    );

  return {
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
  };
}
