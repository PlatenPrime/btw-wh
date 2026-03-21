import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useSearchParams } from "react-router";

export function useSkusByKonkParams() {
  const [params, setParams] = useSearchParams();

  const page = Number(getParam(params, "skuPage", "1"));
  const limit = Number(getParam(params, "skuLimit", "10"));
  const prodName = getParam(params, "skuProd", "");

  const setPage = (newPage: number) =>
    updateSearchParams(params, { skuPage: String(newPage) }, setParams);

  const setLimit = (newLimit: number) =>
    updateSearchParams(
      params,
      { skuLimit: String(newLimit), skuPage: "1" },
      setParams,
    );

  const setProdName = (newProdName: string) =>
    updateSearchParams(
      params,
      { skuProd: newProdName, skuPage: "1" },
      setParams,
    );

  return {
    page,
    limit,
    prodName,
    setPage,
    setLimit,
    setProdName,
  };
}
