/** Точки ряду для спільних range-графіків (залишок/ціна). */
export interface SliceRangeChartPoint {
  date: string;
  stock: number;
  price: number;
}

/** Точки ряду для спільних range-графіків (продажі/виручка). */
export interface SalesRangeChartPoint {
  date: string;
  sales: number;
  revenue: number;
  price: number;
  isDeliveryDay: boolean;
}
