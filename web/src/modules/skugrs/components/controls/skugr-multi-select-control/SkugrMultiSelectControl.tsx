import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import type { ProdDto } from "@/modules/prods/api/types";
import { useSkugrsInfiniteQuery } from "@/modules/skugrs/api/hooks/queries/useSkugrsInfiniteQuery";
import { useCallback, useMemo, useState } from "react";
import { SkugrMultiSelectControlView } from "./SkugrMultiSelectControlView";

export interface SkugrToggleItem {
  id: string;
  title: string;
  imageUrl?: string;
  selected: boolean;
}

export interface SkugrMultiSelectControlProps {
  konkName: string;
  prodName: string;
  value: string[];
  onChange: (ids: string[]) => void;
  onToggleItem?: (item: SkugrToggleItem) => void;
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
  onToggleItem,
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
      const selected = !next.has(skugrId);
      if (selected) {
        next.add(skugrId);
      } else {
        next.delete(skugrId);
      }
      onChange(Array.from(next));
      const skugr = skugrs.find((item) => item._id === skugrId);
      if (!skugr || !onToggleItem) return;
      onToggleItem({
        id: skugr._id,
        title: skugr.title.trim() || skugr._id,
        imageUrl: getProdForSkugr(skugr.prodName)?.imageUrl,
        selected,
      });
    },
    [getProdForSkugr, onChange, onToggleItem, skugrs, valueIds],
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
