export type SkugrGroupsMetric = "salesUah" | "salesPcs";

export interface SkugrGroupSalesRow {
  skugrId: string;
  title: string;
  salesPcs: number;
  salesUah: number;
  share: number;
}
