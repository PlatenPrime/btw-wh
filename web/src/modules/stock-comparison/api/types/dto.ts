export interface StockComparisonDay {
  date: string;
  competitorStock: number;
  btradeStock: number;
}

export interface StockComparisonSummary {
  firstDayCompetitorStock: number;
  lastDayCompetitorStock: number;
  firstDayBtradeStock: number;
  lastDayBtradeStock: number;
  diffCompetitorStock: number;
  diffBtradeStock: number;
  diffCompetitorStockPct: number | null;
  diffBtradeStockPct: number | null;
}

export interface StockComparisonData {
  days: StockComparisonDay[];
  summary: StockComparisonSummary;
}

export interface StockComparisonResponse {
  message: string;
  data: StockComparisonData;
}
