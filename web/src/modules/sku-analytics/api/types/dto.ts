import type { SkuDto, SkusPagination } from "@/modules/skus/api/types";

export interface SkuSliceRowDto {
  productId: string;
  stock: number;
  price: number;
  sku: SkuDto | null;
}

export interface SkuSliceRotationMetaDto {
  cycleDays: number;
  dayIndex: number;
  dueCount: number;
}

export interface SkuSliceDayStatsDto {
  filled: number;
  invalid: number;
  errorCount: number;
  dueTotal?: number;
  abortReason?: string;
}

export interface SkuSliceDayStatusDto {
  konkName: string;
  date: string;
  rotationMeta: SkuSliceRotationMetaDto | null;
  stats: SkuSliceDayStatsDto | null;
  pointsTotal: number;
  pointsInvalid: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SkuSliceDayStatusResponseDto {
  message: string;
  data: SkuSliceDayStatusDto;
}

export interface GetSkuSliceDayStatusParams {
  konkName: string;
  date: string;
  signal?: AbortSignal;
}

export interface SkuSliceDayInvalidPayload {
  konkName: string;
  date: string;
  items: SkuSliceRowDto[];
}

export interface SkuSliceDayInvalidResponseDto {
  message: string;
  data: SkuSliceDayInvalidPayload;
  pagination: SkusPagination;
}

export interface GetSkuSliceDayInvalidParams {
  konkName: string;
  date: string;
  page: number;
  limit: number;
  signal?: AbortSignal;
}

export interface SkuManufacturersPieItemDto {
  title: string;
  salesPcs: number;
  salesUah: number;
}

export type SkuManufacturersPiePayload = Record<string, SkuManufacturersPieItemDto>;

export interface SkuManufacturersPieResponseDto {
  message: string;
  data: SkuManufacturersPiePayload;
}

export interface SkuKonksPieItemDto {
  title: string;
  salesPcs: number;
  salesUah: number;
}

export type SkuKonksPiePayload = Record<string, SkuKonksPieItemDto>;

export interface SkuKonksPieTotalDto {
  title: string;
  salesPcs: number;
  salesUah: number;
}

export interface SkuKonksPieResponseDto {
  message: string;
  data: SkuKonksPiePayload;
  all?: SkuKonksPieTotalDto;
}

export interface SkuKonkProdSkugrGroupSalesItemDto {
  skugrId: string;
  title: string;
  salesPcs: number;
  salesUah: number;
}

export interface SkuKonkProdSkugrGroupsSalesTotalDto {
  title: string;
  salesPcs: number;
  salesUah: number;
}

export interface SkuKonkProdSkugrGroupsSalesResponseDto {
  message: string;
  data: SkuKonkProdSkugrGroupSalesItemDto[];
  all: SkuKonkProdSkugrGroupsSalesTotalDto;
}

export interface SkuSkugrSkusSalesItemDto {
  skuId: string;
  title: string;
  productId?: string;
  imageUrl?: string | null;
  salesPcs: number;
  salesUah: number;
}

export interface SkuSkugrSkusSalesTotalDto {
  title: string;
  salesPcs: number;
  salesUah: number;
}

export interface SkuSkugrSkusSalesResponseDto {
  message: string;
  skugrTitle: string;
  data: SkuSkugrSkusSalesItemDto[];
  all: SkuSkugrSkusSalesTotalDto;
}

/** Позиція черги клієнтського дозаповнення Air-зрізу (GET client/air/pending). */
export interface AirClientPendingItemDto {
  skuId: string;
  productId: string;
  title: string;
  url: string;
}

export interface AirClientPendingPayload {
  date: string;
  items: AirClientPendingItemDto[];
}

export interface AirClientPendingResponseDto {
  message: string;
  data: AirClientPendingPayload;
}

/** Body для PUT client/air/sku/:skuId. */
export interface PutAirClientSkuSliceBodyDto {
  sourceUrl: string;
  html: string;
}

export type AirClientSkuSliceStatus = "saved" | "skipped";

export interface PutAirClientSkuSliceDataDto {
  status: AirClientSkuSliceStatus;
  date: string;
  productId: string;
  stock: number;
  price: number;
}

export interface PutAirClientSkuSliceResponseDto {
  message: string;
  data: PutAirClientSkuSliceDataDto;
}

export interface PutAirClientSkuSliceParams {
  skuId: string;
  body: PutAirClientSkuSliceBodyDto;
  signal?: AbortSignal;
}

export interface PackFlipPointDto {
  stock: number;
  price: number;
}

export type PackFlipFindingKind = "inverse" | "price-only" | "ambiguous";

export interface PackFlipFindingDto {
  productId: string;
  skuId: string;
  title: string;
  url: string;
  imageUrl: string;
  kind: PackFlipFindingKind;
  date: string;
  neighborDate: string;
  factor: number;
  from: PackFlipPointDto;
  patched?: PackFlipPointDto;
}

export interface PackFlipsPayload {
  konkName: string;
  dates: string[];
  patched: PackFlipFindingDto[];
  priceOnly: PackFlipFindingDto[];
  ambiguous: PackFlipFindingDto[];
}

export interface PackFlipsResponseDto {
  message: string;
  data: PackFlipsPayload;
}

export interface GetPackFlipsParams {
  konkName: string;
  dateFrom: string;
  dateTo: string;
  signal?: AbortSignal;
}
