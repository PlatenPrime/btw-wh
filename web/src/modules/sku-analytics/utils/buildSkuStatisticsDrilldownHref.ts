export interface SkuStatisticsProdHrefParams {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
}

export interface SkuStatisticsSkugrHrefParams {
  skugrId: string;
  dateFrom: string;
  dateTo: string;
  konk?: string;
  prod?: string;
}

export function buildSkuStatisticsProdHref({
  konk,
  prod,
  dateFrom,
  dateTo,
}: SkuStatisticsProdHrefParams): string {
  const params = new URLSearchParams({
    konk,
    prod,
    dateFrom,
    dateTo,
  });
  return `/sku/statistics/prod?${params.toString()}`;
}

export function buildSkuStatisticsSkugrHref({
  skugrId,
  dateFrom,
  dateTo,
  konk,
  prod,
}: SkuStatisticsSkugrHrefParams): string {
  const params = new URLSearchParams({
    skugrId,
    dateFrom,
    dateTo,
  });
  if (konk) params.set("konk", konk);
  if (prod) params.set("prod", prod);
  return `/sku/statistics/skugr?${params.toString()}`;
}

/** Відкриває hash-router шлях (`/sku/...`) у новій вкладці. */
export function openSkuStatisticsDrilldownInNewTab(href: string): void {
  const hashPath = href.startsWith("/") ? href : `/${href}`;
  window.open(`#${hashPath}`, "_blank", "noopener,noreferrer");
}
