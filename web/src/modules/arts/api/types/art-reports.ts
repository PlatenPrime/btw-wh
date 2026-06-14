import type { EntityResponse } from "@/types/api";

export interface ArtStockChartDay {
  date: string;
  quantity: number;
}

export interface ArtStockChartSummary {
  firstDayQuantity: number;
  lastDayQuantity: number;
  diffQuantity: number;
  diffQuantityPct: number | null;
}

export interface ArtStockChartData {
  days: ArtStockChartDay[];
  summary: ArtStockChartSummary;
}

export type ArtStockChartResponse = EntityResponse<ArtStockChartData>;

export interface ArtSalesChartDay {
  date: string;
  sales: number;
  revenue: number;
  price: number;
  isDeliveryDay: boolean;
}

export interface ArtSalesChartSummary {
  totalSales: number;
  totalRevenue: number;
}

export interface ArtSalesChartData {
  days: ArtSalesChartDay[];
  summary: ArtSalesChartSummary;
}

export type ArtSalesChartResponse = EntityResponse<ArtSalesChartData>;

export interface DownloadArtExcelResult {
  blob: Blob;
  filename: string;
}
