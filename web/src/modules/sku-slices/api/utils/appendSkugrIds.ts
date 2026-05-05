/**
 * Додає опційний фільтр товарних груп у query API sku-slices (CSV у одному ключі).
 */
export function appendSkugrIds(
  params: URLSearchParams,
  skugrIds?: string[],
): void {
  const filtered = (skugrIds ?? []).map((id) => id.trim()).filter(Boolean);
  if (!filtered.length) return;
  params.set("skugrIds", filtered.join(","));
}
