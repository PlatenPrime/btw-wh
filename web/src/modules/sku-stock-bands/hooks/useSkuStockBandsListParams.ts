import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

export function useSkuStockBandsListParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const konkName = useMemo(
    () => searchParams.get("konk")?.trim().toLowerCase() ?? "",
    [searchParams],
  );

  const setKonkName = useCallback(
    (value: string) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          const normalized = value.trim().toLowerCase();
          if (normalized) {
            next.set("konk", normalized);
          } else {
            next.delete("konk");
          }
          return next;
        },
        { replace: true },
      );
    },
    [setSearchParams],
  );

  return { konkName, setKonkName };
}
