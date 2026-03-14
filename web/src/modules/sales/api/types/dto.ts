export interface SalesComparisonDay {
  date: string;
  competitorSales: number;
  competitorRevenue: number;
  btradeSales: number;
  btradeRevenue: number;
}

export interface SalesComparisonSummary {
  totalCompetitorSales: number;
  totalBtradeSales: number;
  totalCompetitorRevenue: number;
  totalBtradeRevenue: number;
  diffSalesPcs: number;
  diffRevenueUah: number;
  diffSalesPct: number | null;
  diffRevenuePct: number | null;
}

export interface SalesComparisonData {
  days: SalesComparisonDay[];
  summary: SalesComparisonSummary;
}

export interface SalesComparisonResponse {
  message: string;
  data: SalesComparisonData;
}
