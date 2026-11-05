import type { SkuMultiSelectQuery } from "@/modules/skus/components/controls/sku-multi-select-control";

export interface BuildSkuSelectionParamsInput {
  selectAll: boolean;
  skuIds: readonly string[];
  query: SkuMultiSelectQuery;
  dateFrom: string;
  dateTo: string;
  metrics: readonly string[];
}

/** Params for sku-selection-stock / sku-selection-sales (and pie body without metrics). */
export function buildSkuSelectionScopeParams({
  selectAll,
  skuIds,
  query,
}: Pick<
  BuildSkuSelectionParamsInput,
  "selectAll" | "skuIds" | "query"
>): Record<string, unknown> {
  if (selectAll) {
    const params: Record<string, unknown> = { selectAll: true };
    const search = query.search.trim();
    const konkName = query.konkName.trim();
    const prodName = query.prodName.trim();
    if (search) params.search = search;
    if (konkName) params.konkName = konkName;
    if (prodName) params.prodName = prodName;
    return params;
  }
  return { skuIds: [...skuIds] };
}

export function buildSkuSelectionJobParams(
  input: BuildSkuSelectionParamsInput,
): Record<string, unknown> {
  return {
    ...buildSkuSelectionScopeParams(input),
    dateFrom: input.dateFrom,
    dateTo: input.dateTo,
    metrics: [...input.metrics],
  };
}

export function skuSelectionTitleCount(opts: {
  selectAll: boolean;
  matchedTotal: number;
  pickCount: number;
}): string {
  if (opts.selectAll) return `усі (${opts.matchedTotal})`;
  return String(opts.pickCount);
}

export function hasSkuSelection(opts: {
  selectAll: boolean;
  pickCount: number;
}): boolean {
  return opts.selectAll || opts.pickCount > 0;
}
