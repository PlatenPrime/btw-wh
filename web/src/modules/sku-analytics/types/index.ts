export type SkuStatisticsMetric = "salesUah" | "salesPcs";

export interface SkuStatisticsRow {
  prodName: string;
  title: string;
  salesPcs: number;
  salesUah: number;
  share: number;
}
