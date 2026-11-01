import { SKU_MULTI_SELECT_MAX } from "@/modules/skus/components/controls/sku-multi-select-control";
import type { SkuMultiSelectPick } from "@/modules/skus/components/controls/sku-multi-select-control";
import { getParam } from "@/utils/getParam";
import { updateSearchParams } from "@/utils/updateSearchParams";
import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";

const OBJECT_ID_RE = /^[a-f\d]{24}$/i;

function parseSkuIds(raw: string): string[] {
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const part of raw.split(",")) {
    const id = part.trim();
    if (!OBJECT_ID_RE.test(id) || seen.has(id)) continue;
    seen.add(id);
    ids.push(id);
    if (ids.length >= SKU_MULTI_SELECT_MAX) break;
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

export function useSkuSelectionComparisonParams() {
  const [params, setParams] = useSearchParams();

  const skuIdsRaw = getParam(params, "skuIds", "");
  const skuMetaRaw = getParam(params, "skuMeta", "");
  const dateFrom = getParam(params, "dateFrom", "");
  const dateTo = getParam(params, "dateTo", "");

  const skuIds = useMemo(() => parseSkuIds(skuIdsRaw), [skuIdsRaw]);
  const metaById = useMemo(() => parseSkuMeta(skuMetaRaw), [skuMetaRaw]);

  const skuPicks = useMemo<SkuMultiSelectPick[]>(
    () =>
      skuIds.map(
        (id) =>
          metaById.get(id) ?? {
            id,
            title: id,
            konkName: "",
            prodName: "",
          },
      ),
    [metaById, skuIds],
  );

  const setSkuPicks = (picks: SkuMultiSelectPick[]) => {
    let next = picks;
    if (picks.length > SKU_MULTI_SELECT_MAX) {
      toast.message(`Максимум ${SKU_MULTI_SELECT_MAX} товарів`);
      next = picks.slice(0, SKU_MULTI_SELECT_MAX);
    }
    const ids = next.map((pick) => pick.id).join(",");
    const meta =
      next.length > 0
        ? JSON.stringify(
            next.map((pick) => ({
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
      { skuIds: ids, skuMeta: meta },
      setParams,
    );
  };

  const setDateRange = (from: string, to: string) =>
    updateSearchParams(params, { dateFrom: from, dateTo: to }, setParams);

  return {
    skuIds,
    skuPicks,
    dateFrom,
    dateTo,
    setSkuPicks,
    setDateRange,
  };
}
