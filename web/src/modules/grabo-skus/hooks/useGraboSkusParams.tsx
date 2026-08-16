import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export type GraboTriStateFilter = "" | "true" | "false";

function parseTriState(raw: string): GraboTriStateFilter {
  if (raw === "true" || raw === "false") return raw;
  return "";
}

function parseTriStateToBoolean(
  value: GraboTriStateFilter,
): boolean | undefined {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export function useGraboSkusParams() {
  const [params, setParams] = useSearchParams();

  const page = Number(getParam(params, "page", "1"));
  const limit = Number(getParam(params, "limit", "20"));
  const search = getParam(params, "search", "");
  const color = getParam(params, "color", "");
  const size = getParam(params, "size", "");
  const material = getParam(params, "material", "");
  const gas = getParam(params, "gas", "");
  const language = getParam(params, "language", "");
  const gasCapacity = getParam(params, "gasCapacity", "");
  const tag = getParam(params, "tag", "");
  const isOnSite = parseTriState(getParam(params, "isOnSite", ""));
  const isNewProduct = parseTriState(getParam(params, "isNewProduct", ""));

  const setPage = (newPage: number) =>
    updateSearchParams(params, { page: String(newPage) }, setParams);

  const setLimit = (newLimit: number) =>
    updateSearchParams(
      params,
      { limit: String(newLimit), page: "1" },
      setParams,
    );

  const setSearch = (newSearch: string) =>
    updateSearchParams(params, { search: newSearch, page: "1" }, setParams);

  const setColor = (value: string) =>
    updateSearchParams(params, { color: value, page: "1" }, setParams);

  const setSize = (value: string) =>
    updateSearchParams(params, { size: value, page: "1" }, setParams);

  const setMaterial = (value: string) =>
    updateSearchParams(params, { material: value, page: "1" }, setParams);

  const setGas = (value: string) =>
    updateSearchParams(params, { gas: value, page: "1" }, setParams);

  const setLanguage = (value: string) =>
    updateSearchParams(params, { language: value, page: "1" }, setParams);

  const setGasCapacity = (value: string) =>
    updateSearchParams(params, { gasCapacity: value, page: "1" }, setParams);

  const setTag = (value: string) =>
    updateSearchParams(params, { tag: value, page: "1" }, setParams);

  const setIsOnSite = (value: GraboTriStateFilter) =>
    updateSearchParams(params, { isOnSite: value, page: "1" }, setParams);

  const setIsNewProduct = (value: GraboTriStateFilter) =>
    updateSearchParams(params, { isNewProduct: value, page: "1" }, setParams);

  return {
    page,
    limit,
    search,
    color,
    size,
    material,
    gas,
    language,
    gasCapacity,
    tag,
    isOnSite,
    isNewProduct,
    listQuery: {
      isOnSite: parseTriStateToBoolean(isOnSite),
      isNewProduct: parseTriStateToBoolean(isNewProduct),
    },
    setPage,
    setLimit,
    setSearch,
    setColor,
    setSize,
    setMaterial,
    setGas,
    setLanguage,
    setGasCapacity,
    setTag,
    setIsOnSite,
    setIsNewProduct,
  };
}
