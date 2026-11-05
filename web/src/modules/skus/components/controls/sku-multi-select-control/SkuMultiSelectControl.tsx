import { useDebounce } from "@/hooks/useDebounce";
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
  type SkuMultiSelectLayout,
  type SkuMultiSelectPick,
  type SkuMultiSelectQuery,
} from "./SkuMultiSelectControlView";

export type {
  SkuMultiSelectLayout,
  SkuMultiSelectPick,
  SkuMultiSelectQuery,
};

function normalizeQuery(query: SkuMultiSelectQuery): SkuMultiSelectQuery {
  return {
    search: query.search.trim(),
    konkName: query.konkName.trim(),
    prodName: query.prodName.trim(),
  };
}

export interface SkuMultiSelectControlProps {
  value: readonly SkuMultiSelectPick[];
  onChange: (picks: SkuMultiSelectPick[]) => void;
  selectAll?: boolean;
  onSelectAllChange?: (selectAll: boolean) => void;
  onSelectionQueryChange?: (query: SkuMultiSelectQuery) => void;
  onMatchedTotalChange?: (total: number) => void;
  /** Гідрація search/konk/prod з URL/journey — щоб не затерти на mount. */
  initialQuery?: SkuMultiSelectQuery;
  /** Після повного скидання фільтрів (наприклад зняти pie run у URL). */
  onReset?: () => void;
  /** Елементи на початку toolbar (наприклад період). */
  leadingSlot?: ReactNode;
  /** dialog — вузький Excel-діалог; page — сторінка/майстер. */
  layout?: SkuMultiSelectLayout;
  /** Обмежити пошук конкурентом ззовні; порожнє = фільтр у контролі. */
  konkName?: string;
  enabled?: boolean;
  disabled?: boolean;
  searchInputId?: string;
  /** Текст, коли каталог вимкнений (наприклад немає періоду на page). */
  disabledHint?: string;
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
  initialQuery,
  onReset,
  leadingSlot,
  layout = "page",
  konkName: lockedKonkName,
  enabled = true,
  disabled = false,
  searchInputId,
  disabledHint,
}: SkuMultiSelectControlProps) {
  const [search, setSearch] = useState(() => initialQuery?.search ?? "");
  const [filterKonkName, setFilterKonkName] = useState(
    () => initialQuery?.konkName ?? "",
  );
  const [filterProdName, setFilterProdName] = useState(
    () => initialQuery?.prodName ?? "",
  );
  const [page, setPage] = useState(1);
  const [accumulated, setAccumulated] = useState<SkuDto[]>([]);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const effectiveKonkName = lockedKonkName?.trim()
    ? lockedKonkName.trim()
    : filterKonkName.trim();
  const showKonkFilter = !lockedKonkName?.trim();

  const listEnabled = enabled && !disabled;
  const konksQuery = useKonksQuery({ enabled: listEnabled });
  const prodsQuery = useProdsQuery({ enabled: listEnabled });

  const catalogQuery = useSkusCatalogQuery({
    page,
    limit: 20,
    search: debouncedSearch,
    konkName: effectiveKonkName,
    prodName: filterProdName.trim(),
    enabled: listEnabled,
    debounceMs: 0,
  });

  const matchedTotal = listEnabled
    ? (catalogQuery.data?.pagination.total ?? 0)
    : 0;

  const selectionQuery = useMemo<SkuMultiSelectQuery>(
    () => ({
      search: debouncedSearch.trim(),
      konkName: effectiveKonkName,
      prodName: filterProdName.trim(),
    }),
    [debouncedSearch, effectiveKonkName, filterProdName],
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

  const lastQueryRef = useRef<SkuMultiSelectQuery | null>(
    initialQuery ? normalizeQuery(initialQuery) : null,
  );
  const lastMatchedTotalRef = useRef<number | null>(null);
  const prevCatalogKeyRef = useRef<string | null>(null);

  const catalogKey = `${debouncedSearch}\0${effectiveKonkName}\0${filterProdName.trim()}`;

  useEffect(() => {
    if (!listEnabled) {
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
  }, [listEnabled, selectionQuery]);

  useEffect(() => {
    if (lastMatchedTotalRef.current === matchedTotal) return;
    lastMatchedTotalRef.current = matchedTotal;
    onMatchedTotalChangeRef.current?.(matchedTotal);
  }, [matchedTotal]);

  // Скинути пагінацію/selectAll при зміні фільтрів каталогу.
  useEffect(() => {
    if (prevCatalogKeyRef.current === null) {
      prevCatalogKeyRef.current = catalogKey;
      return;
    }
    if (prevCatalogKeyRef.current === catalogKey) return;
    prevCatalogKeyRef.current = catalogKey;
    setPage(1);
    setAccumulated([]);
    onSelectAllChangeRef.current?.(false);
  }, [catalogKey]);

  const bumpCatalog = useCallback(() => {
    setPage(1);
    setAccumulated([]);
    onSelectAllChangeRef.current?.(false);
  }, []);

  const handleSearchChange = useCallback((next: string) => {
    setSearch(next);
  }, []);

  const handleFilterKonkNameChange = useCallback(
    (next: string) => {
      setFilterKonkName(next);
      bumpCatalog();
    },
    [bumpCatalog],
  );

  const handleFilterProdNameChange = useCallback(
    (next: string) => {
      setFilterProdName(next);
      bumpCatalog();
    },
    [bumpCatalog],
  );

  const canReset = Boolean(
    search.trim() ||
      filterKonkName.trim() ||
      filterProdName.trim() ||
      selectAll ||
      value.length > 0,
  );

  const handleReset = useCallback(() => {
    setSearch("");
    setFilterKonkName("");
    setFilterProdName("");
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

  // Немає періоду (enabled=false) — скинути selectAll, щоб pie/job не пішли зі stale flag.
  // disabled (напр. isStarting) selectAll не чіпаємо.
  useEffect(() => {
    if (!enabled) {
      onSelectAllChangeRef.current?.(false);
    }
  }, [enabled]);

  useEffect(() => {
    if (!listEnabled) {
      setAccumulated([]);
      return;
    }
    if (catalogQuery.isPlaceholderData) return;
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
  }, [
    catalogQuery.data?.data,
    catalogQuery.isPlaceholderData,
    listEnabled,
    page,
  ]);

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
    listEnabled &&
    page === 1 &&
    accumulated.length === 0 &&
    (catalogQuery.isPending || catalogQuery.isFetching);

  return (
    <>
      <SkuMultiSelectControlView
        layout={layout}
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
        catalogActive={listEnabled}
        disabledHint={disabledHint}
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
