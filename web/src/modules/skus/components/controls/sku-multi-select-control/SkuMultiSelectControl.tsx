import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import type { KonkDto } from "@/modules/konks/api/types";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import type { ProdDto } from "@/modules/prods/api/types";
import { useSkusCatalogQuery } from "@/modules/skus/api/hooks/queries/useSkusCatalogQuery";
import type { SkuDto } from "@/modules/skus/api/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  SkuMultiSelectControlView,
  type SkuMultiSelectPick,
} from "./SkuMultiSelectControlView";

export type { SkuMultiSelectPick };

/** Ліміт selection API / excel-jobs (1..100). */
export const SKU_MULTI_SELECT_MAX = 100;

export interface SkuMultiSelectControlProps {
  value: readonly SkuMultiSelectPick[];
  onChange: (picks: SkuMultiSelectPick[]) => void;
  /** Обмежити пошук конкурентом; порожнє = усі. */
  konkName?: string;
  maxSelected?: number;
  enabled?: boolean;
  disabled?: boolean;
  searchInputId?: string;
}

function toPick(sku: SkuDto): SkuMultiSelectPick {
  return {
    id: sku._id,
    title: sku.title.trim() || sku.productId,
    imageUrl: sku.imageUrl || undefined,
    konkName: sku.konkName,
    prodName: sku.prodName,
  };
}

export function SkuMultiSelectControl({
  value,
  onChange,
  konkName = "",
  maxSelected = SKU_MULTI_SELECT_MAX,
  enabled = true,
  disabled = false,
  searchInputId,
}: SkuMultiSelectControlProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [accumulated, setAccumulated] = useState<SkuDto[]>([]);

  const konksQuery = useKonksQuery({ enabled: enabled && !disabled });
  const prodsQuery = useProdsQuery({ enabled: enabled && !disabled });

  const listEnabled = enabled && !disabled;
  const catalogQuery = useSkusCatalogQuery({
    page,
    limit: 20,
    search,
    konkName: konkName.trim(),
    enabled: listEnabled,
  });

  useEffect(() => {
    setPage(1);
    setAccumulated([]);
  }, [search, konkName]);

  useEffect(() => {
    const pageData = catalogQuery.data?.data;
    if (!pageData) return;
    setAccumulated((prev) => {
      if (page === 1) return pageData;
      const seen = new Set(prev.map((sku) => sku._id));
      const next = [...prev];
      for (const sku of pageData) {
        if (!seen.has(sku._id)) next.push(sku);
      }
      return next;
    });
  }, [catalogQuery.data?.data, page]);

  const konkByName = useMemo(() => {
    const map = new Map<string, KonkDto>();
    for (const konk of konksQuery.data?.data ?? []) {
      map.set(konk.name, konk);
    }
    return map;
  }, [konksQuery.data?.data]);

  const prodByName = useMemo(() => {
    const map = new Map<string, ProdDto>();
    for (const prod of prodsQuery.data?.data ?? []) {
      map.set(prod.name, prod);
    }
    return map;
  }, [prodsQuery.data?.data]);

  const valueIds = useMemo(
    () => new Set(value.map((pick) => pick.id)),
    [value],
  );

  const handleToggle = useCallback(
    (sku: SkuDto) => {
      if (valueIds.has(sku._id)) {
        onChange(value.filter((pick) => pick.id !== sku._id));
        return;
      }
      if (value.length >= maxSelected) return;
      onChange([...value, toPick(sku)]);
    },
    [maxSelected, onChange, value, valueIds],
  );

  const handleRemovePick = useCallback(
    (id: string) => {
      onChange(value.filter((pick) => pick.id !== id));
    },
    [onChange, value],
  );

  const hasNextPage = Boolean(catalogQuery.data?.pagination.hasNext);
  const isLoadingFirstPage =
    catalogQuery.isPending && accumulated.length === 0 && page === 1;

  return (
    <SkuMultiSelectControlView
      search={search}
      onSearchChange={setSearch}
      skus={accumulated}
      valueIds={valueIds}
      picks={value}
      onToggle={handleToggle}
      onRemovePick={handleRemovePick}
      isLoadingFirstPage={isLoadingFirstPage}
      isFetchingNextPage={catalogQuery.isFetching && page > 1}
      hasNextPage={hasNextPage}
      fetchNextPage={() => {
        if (hasNextPage && !catalogQuery.isFetching) {
          setPage((prev) => prev + 1);
        }
      }}
      hasMoreOnServer={false}
      maxSelected={maxSelected}
      disabled={disabled}
      searchInputId={searchInputId}
      konkByName={konkByName}
      prodByName={prodByName}
    />
  );
}
