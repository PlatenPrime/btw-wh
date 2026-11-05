import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import type { KonkDto } from "@/modules/konks/api/types";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import type { ProdDto } from "@/modules/prods/api/types";
import { useSkusCatalogQuery } from "@/modules/skus/api/hooks/queries/useSkusCatalogQuery";
import type { SkuDto } from "@/modules/skus/api/types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { SelectAllSkusConfirmDialog } from "./SelectAllSkusConfirmDialog";
import {
  SkuMultiSelectControlView,
  type SkuMultiSelectPick,
  type SkuMultiSelectQuery,
} from "./SkuMultiSelectControlView";

export type { SkuMultiSelectPick, SkuMultiSelectQuery };

export interface SkuMultiSelectControlProps {
  value: readonly SkuMultiSelectPick[];
  onChange: (picks: SkuMultiSelectPick[]) => void;
  selectAll?: boolean;
  onSelectAllChange?: (selectAll: boolean) => void;
  onSelectionQueryChange?: (query: SkuMultiSelectQuery) => void;
  onMatchedTotalChange?: (total: number) => void;
  /** Після повного скидання фільтрів/run каталогу (наприклад зняти pie run у URL). */
  onReset?: () => void;
  /** Елементи на початку toolbar (наприклад період). */
  leadingSlot?: ReactNode;
  /** Обмежити пошук конкурентом ззовні; порожнє = фільтр у контролі. */
  konkName?: string;
  enabled?: boolean;
  disabled?: boolean;
  searchInputId?: string;
}

function sameQuery(a: SkuMultiSelectQuery, b: SkuMultiSelectQuery): boolean {
  return (
    a.search === b.search &&
    a.konkName === b.konkName &&
    a.prodName === b.prodName
  );
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
  selectAll = false,
  onSelectAllChange,
  onSelectionQueryChange,
  onMatchedTotalChange,
  onReset,
  leadingSlot,
  konkName: lockedKonkName,
  enabled = true,
  disabled = false,
  searchInputId,
}: SkuMultiSelectControlProps) {
  const [search, setSearch] = useState("");
  const [filterKonkName, setFilterKonkName] = useState("");
  const [filterProdName, setFilterProdName] = useState("");
  const [hasRun, setHasRun] = useState(false);
  const [page, setPage] = useState(1);
  const [accumulated, setAccumulated] = useState<SkuDto[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const effectiveKonkName = lockedKonkName?.trim()
    ? lockedKonkName.trim()
    : filterKonkName.trim();
  const showKonkFilter = !lockedKonkName?.trim();

  const konksQuery = useKonksQuery({ enabled: enabled && !disabled });
  const prodsQuery = useProdsQuery({ enabled: enabled && !disabled });

  const listEnabled = enabled && !disabled && hasRun;
  const catalogQuery = useSkusCatalogQuery({
    page,
    limit: 20,
    search,
    konkName: effectiveKonkName,
    prodName: filterProdName.trim(),
    enabled: listEnabled,
  });

  const matchedTotal = hasRun
    ? (catalogQuery.data?.pagination.total ?? 0)
    : 0;

  const selectionQuery = useMemo<SkuMultiSelectQuery>(
    () => ({
      search: search.trim(),
      konkName: effectiveKonkName,
      prodName: filterProdName.trim(),
    }),
    [effectiveKonkName, filterProdName, search],
  );

  const onSelectionQueryChangeRef = useRef(onSelectionQueryChange);
  const onMatchedTotalChangeRef = useRef(onMatchedTotalChange);
  const onSelectAllChangeRef = useRef(onSelectAllChange);
  const onResetRef = useRef(onReset);
  const onChangeRef = useRef(onChange);
  onSelectionQueryChangeRef.current = onSelectionQueryChange;
  onMatchedTotalChangeRef.current = onMatchedTotalChange;
  onSelectAllChangeRef.current = onSelectAllChange;
  onResetRef.current = onReset;
  onChangeRef.current = onChange;

  const lastQueryRef = useRef<SkuMultiSelectQuery | null>(null);
  const lastMatchedTotalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!hasRun) {
      lastQueryRef.current = null;
      return;
    }
    if (
      lastQueryRef.current &&
      sameQuery(lastQueryRef.current, selectionQuery)
    ) {
      return;
    }
    lastQueryRef.current = selectionQuery;
    onSelectionQueryChangeRef.current?.(selectionQuery);
  }, [hasRun, selectionQuery]);

  useEffect(() => {
    if (lastMatchedTotalRef.current === matchedTotal) return;
    lastMatchedTotalRef.current = matchedTotal;
    onMatchedTotalChangeRef.current?.(matchedTotal);
  }, [matchedTotal]);

  const resetCatalog = useCallback(() => {
    setHasRun(false);
    setPage(1);
    setAccumulated([]);
    onSelectAllChangeRef.current?.(false);
  }, []);

  const handleSearchChange = useCallback(
    (next: string) => {
      setSearch(next);
      resetCatalog();
    },
    [resetCatalog],
  );

  const handleFilterKonkNameChange = useCallback(
    (next: string) => {
      setFilterKonkName(next);
      resetCatalog();
    },
    [resetCatalog],
  );

  const handleFilterProdNameChange = useCallback(
    (next: string) => {
      setFilterProdName(next);
      resetCatalog();
    },
    [resetCatalog],
  );

  const handleRun = useCallback(() => {
    setPage(1);
    setAccumulated([]);
    onSelectAllChangeRef.current?.(false);
    setHasRun(true);
  }, []);

  const canReset = Boolean(
    search.trim() ||
      filterKonkName.trim() ||
      filterProdName.trim() ||
      hasRun ||
      selectAll ||
      value.length > 0,
  );

  const handleReset = useCallback(() => {
    setSearch("");
    setFilterKonkName("");
    setFilterProdName("");
    setHasRun(false);
    setPage(1);
    setAccumulated([]);
    lastQueryRef.current = null;
    lastMatchedTotalRef.current = null;
    onChangeRef.current([]);
    onSelectAllChangeRef.current?.(false);
    onMatchedTotalChangeRef.current?.(0);
    onSelectionQueryChangeRef.current?.({
      search: "",
      konkName: lockedKonkName?.trim() ?? "",
      prodName: "",
    });
    onResetRef.current?.();
  }, [lockedKonkName]);

  useEffect(() => {
    if (!hasRun) return;
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
  }, [catalogQuery.data?.data, hasRun, page]);

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
      if (selectAll) return;
      if (valueIds.has(sku._id)) {
        onChange(value.filter((pick) => pick.id !== sku._id));
        return;
      }
      onChange([...value, toPick(sku)]);
    },
    [onChange, selectAll, value, valueIds],
  );

  const handleConfirmSelectAll = useCallback(() => {
    onChange([]);
    onSelectAllChangeRef.current?.(true);
    setConfirmOpen(false);
  }, [onChange]);

  const handleClearSelectAll = useCallback(() => {
    onSelectAllChangeRef.current?.(false);
  }, []);

  const hasNextPage = Boolean(catalogQuery.data?.pagination.hasNext);
  const isLoadingFirstPage =
    catalogQuery.isPending && accumulated.length === 0 && page === 1;

  return (
    <>
      <SkuMultiSelectControlView
        leadingSlot={leadingSlot}
        search={search}
        onSearchChange={handleSearchChange}
        filterKonkName={filterKonkName}
        onFilterKonkNameChange={handleFilterKonkNameChange}
        filterProdName={filterProdName}
        onFilterProdNameChange={handleFilterProdNameChange}
        showKonkFilter={showKonkFilter}
        konks={konksQuery.data?.data ?? []}
        prods={prodsQuery.data?.data ?? []}
        hasRun={hasRun}
        onRun={handleRun}
        canReset={canReset}
        onReset={handleReset}
        skus={accumulated}
        valueIds={valueIds}
        selectAll={selectAll}
        matchedTotal={matchedTotal}
        selectedCount={value.length}
        onToggle={handleToggle}
        onRequestSelectAll={() => setConfirmOpen(true)}
        onClearSelectAll={handleClearSelectAll}
        isLoadingFirstPage={isLoadingFirstPage}
        isFetchingNextPage={catalogQuery.isFetching && page > 1}
        hasNextPage={hasNextPage}
        fetchNextPage={() => {
          if (hasNextPage && !catalogQuery.isFetching) {
            setPage((prev) => prev + 1);
          }
        }}
        disabled={disabled}
        searchInputId={searchInputId}
        konkByName={konkByName}
        prodByName={prodByName}
      />
      <SelectAllSkusConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        matchedTotal={matchedTotal}
        onConfirm={handleConfirmSelectAll}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
