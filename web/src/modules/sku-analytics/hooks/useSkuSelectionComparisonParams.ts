import type {
  SkuMultiSelectPick,
  SkuMultiSelectQuery,
} from "@/modules/skus/components/controls/sku-multi-select-control";
import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";

const OBJECT_ID_RE = /^[a-f\d]{24}$/i;

function parseSkuIds(raw: string): string[] {
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const part of raw.split(",")) {
    const id = part.trim();
    if (!OBJECT_ID_RE.test(id) || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
  }
  return ids;
}

function parseSkuMeta(raw: string): Map<string, SkuMultiSelectPick> {
  const map = new Map<string, SkuMultiSelectPick>();
  if (!raw) return map;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return map;
    for (const item of parsed) {
      if (!item || typeof item !== "object") continue;
      const record = item as {
        id?: unknown;
        title?: unknown;
        imageUrl?: unknown;
        konkName?: unknown;
        prodName?: unknown;
      };
      const id = typeof record.id === "string" ? record.id.trim() : "";
      if (!OBJECT_ID_RE.test(id)) continue;
      map.set(id, {
        id,
        title:
          typeof record.title === "string" && record.title.trim()
            ? record.title.trim()
            : id,
        imageUrl:
          typeof record.imageUrl === "string" ? record.imageUrl : undefined,
        konkName:
          typeof record.konkName === "string" ? record.konkName : "",
        prodName:
          typeof record.prodName === "string" ? record.prodName : "",
      });
    }
  } catch {
    return map;
  }
  return map;
}

function parseMatchedTotal(raw: string): number {
  if (!/^\d+$/.test(raw)) return 0;
  const n = Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function useSkuSelectionComparisonParams() {
  const [params, setParams] = useSearchParams();

  const skuIdsRaw = getParam(params, "skuIds", "");
  const skuMetaRaw = getParam(params, "skuMeta", "");
  const dateFrom = getParam(params, "dateFrom", "");
  const dateTo = getParam(params, "dateTo", "");
  const selectAll = getParam(params, "selectAll", "") === "1";
  const search = getParam(params, "search", "");
  const konk = getParam(params, "konk", "");
  const prod = getParam(params, "prod", "");
  const matchedTotal = parseMatchedTotal(getParam(params, "matched", ""));
  const hasRun = getParam(params, "run", "") === "1";

  const skuIds = useMemo(() => parseSkuIds(skuIdsRaw), [skuIdsRaw]);
  const metaById = useMemo(() => parseSkuMeta(skuMetaRaw), [skuMetaRaw]);

  const skuPicks = useMemo<SkuMultiSelectPick[]>(
    () =>
      selectAll
        ? []
        : skuIds.map(
            (id) =>
              metaById.get(id) ?? {
                id,
                title: id,
                konkName: "",
                prodName: "",
              },
          ),
    [metaById, selectAll, skuIds],
  );

  const selectionQuery = useMemo<SkuMultiSelectQuery>(
    () => ({
      search,
      konkName: konk,
      prodName: prod,
    }),
    [konk, prod, search],
  );

  const setSkuPicks = useCallback(
    (picks: SkuMultiSelectPick[]) => {
      const ids = picks.map((pick) => pick.id).join(",");
      const meta =
        picks.length > 0
          ? JSON.stringify(
              picks.map((pick) => ({
                id: pick.id,
                title: pick.title,
                imageUrl: pick.imageUrl,
                konkName: pick.konkName,
                prodName: pick.prodName,
              })),
            )
          : "";
      updateSearchParams(
        params,
        {
          skuIds: ids,
          skuMeta: meta,
          selectAll: "",
          run: "",
        },
        setParams,
      );
    },
    [params, setParams],
  );

  const setSelectAll = useCallback(
    (next: boolean) => {
      const nextFlag = next ? "1" : "";
      const currentFlag = selectAll ? "1" : "";
      if (nextFlag === currentFlag) return;
      updateSearchParams(
        params,
        {
          selectAll: nextFlag,
          skuIds: next ? "" : skuIdsRaw,
          skuMeta: next ? "" : skuMetaRaw,
          run: "",
        },
        setParams,
      );
    },
    [params, selectAll, setParams, skuIdsRaw, skuMetaRaw],
  );

  const setSelectionQuery = useCallback(
    (query: SkuMultiSelectQuery) => {
      if (
        query.search === search &&
        query.konkName === konk &&
        query.prodName === prod
      ) {
        return;
      }
      updateSearchParams(
        params,
        {
          search: query.search,
          konk: query.konkName,
          prod: query.prodName,
        },
        setParams,
      );
    },
    [konk, params, prod, search, setParams],
  );

  const setMatchedTotal = useCallback(
    (total: number) => {
      const next = total > 0 ? String(total) : "";
      const current = matchedTotal > 0 ? String(matchedTotal) : "";
      if (next === current) return;
      updateSearchParams(params, { matched: next }, setParams);
    },
    [matchedTotal, params, setParams],
  );

  const setDateRange = useCallback(
    (from: string, to: string) => {
      if (from === dateFrom && to === dateTo) return;
      updateSearchParams(
        params,
        { dateFrom: from, dateTo: to, run: "" },
        setParams,
      );
    },
    [dateFrom, dateTo, params, setParams],
  );

  const markRun = useCallback(() => {
    if (hasRun) return;
    updateSearchParams(params, { run: "1" }, setParams);
  }, [hasRun, params, setParams]);

  /** Скидає вибірку/фільтри URL і pie run (дати лишаються). */
  const resetSelection = useCallback(() => {
    updateSearchParams(
      params,
      {
        skuIds: "",
        skuMeta: "",
        selectAll: "",
        search: "",
        konk: "",
        prod: "",
        matched: "",
        run: "",
      },
      setParams,
    );
  }, [params, setParams]);

  return {
    skuIds,
    skuPicks,
    selectAll,
    selectionQuery,
    matchedTotal,
    dateFrom,
    dateTo,
    hasRun,
    setSkuPicks,
    setSelectAll,
    setSelectionQuery,
    setMatchedTotal,
    setDateRange,
    markRun,
    resetSelection,
  };
}
