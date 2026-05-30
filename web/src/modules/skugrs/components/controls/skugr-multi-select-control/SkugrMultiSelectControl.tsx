import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import type { ProdDto } from "@/modules/prods/api/types";
import { useSkugrsInfiniteQuery } from "@/modules/skugrs/api/hooks/queries/useSkugrsInfiniteQuery";
import { useCallback, useMemo, useState } from "react";
import { SkugrMultiSelectControlView } from "./SkugrMultiSelectControlView";

export interface SkugrMultiSelectControlProps {
  konkName: string;
  prodName: string;
  value: string[];
  onChange: (ids: string[]) => void;
  enabled?: boolean;
  limit?: number;
  disabled?: boolean;
  searchInputId?: string;
}

export function SkugrMultiSelectControl({
  konkName,
  prodName,
  value,
  onChange,
  enabled = true,
  limit = 20,
  disabled = false,
  searchInputId,
}: SkugrMultiSelectControlProps) {
  const [search, setSearch] = useState("");
  const prodsQuery = useProdsQuery();

  const prodByName = useMemo(() => {
    const map = new Map<string, ProdDto>();
    for (const prod of prodsQuery.data?.data ?? []) {
      map.set(prod.name, prod);
    }
    return map;
  }, [prodsQuery.data?.data]);

  const getProdForSkugr = useCallback(
    (prodName: string) => prodByName.get(prodName),
    [prodByName],
  );

  /** prodName може бути порожнім — усі групи конкурента (режим «Всі виробники»). */
  const listEnabled = enabled && Boolean(konkName) && !disabled;

  const infiniteQuery = useSkugrsInfiniteQuery({
    limit,
    search,
    konkName,
    prodName,
    enabled: listEnabled,
  });

  const skugrs = useMemo(
    () => infiniteQuery.data?.pages.flatMap((page) => page.data) ?? [],
    [infiniteQuery.data?.pages],
  );

  const valueIds = useMemo(() => new Set(value), [value]);

  const handleToggle = useCallback(
    (skugrId: string) => {
      const next = new Set(valueIds);
      if (next.has(skugrId)) {
        next.delete(skugrId);
      } else {
        next.add(skugrId);
      }
      onChange(Array.from(next));
    },
    [onChange, valueIds],
  );

  const isLoadingFirstPage = infiniteQuery.isPending && skugrs.length === 0;

  return (
    <SkugrMultiSelectControlView
      search={search}
      onSearchChange={setSearch}
      skugrs={skugrs}
      valueIds={valueIds}
      onToggle={handleToggle}
      isLoadingFirstPage={isLoadingFirstPage}
      isFetchingNextPage={infiniteQuery.isFetchingNextPage}
      hasNextPage={infiniteQuery.hasNextPage ?? false}
      fetchNextPage={() => void infiniteQuery.fetchNextPage()}
      disabled={disabled}
      searchInputId={searchInputId}
      getProdForSkugr={getProdForSkugr}
    />
  );
}
