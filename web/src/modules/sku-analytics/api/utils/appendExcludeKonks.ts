/**
 * Додає опційний excludeKonks у query API sku-chart-reports (CSV у одному ключі).
 */
export function appendExcludeKonks(
  params: URLSearchParams,
  excludeKonks?: string[],
): void {
  const filtered = (excludeKonks ?? [])
    .map((name) => name.trim())
    .filter(Boolean);
  if (!filtered.length) return;
  params.set("excludeKonks", filtered.join(","));
}
