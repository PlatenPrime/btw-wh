export type SkuStatisticsMetric = "salesUah" | "salesPcs";

/** Статус позиції у черзі клієнтського дозаповнення Air-зрізу. */
export type AirClientRowStatus =
  | "pending"
  | "capturing"
  | "saving"
  | "saved"
  | "skipped"
  | "error";

export interface AirClientRowState {
  status: AirClientRowStatus;
  /** Людиночитне повідомлення для статусу error. */
  message?: string;
  /** Код помилки (HTTP body.code або код розширення). */
  code?: string;
}

export interface SkuStatisticsRow {
  prodName: string;
  title: string;
  salesPcs: number;
  salesUah: number;
  share: number;
}
