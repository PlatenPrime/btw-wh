import type { SkuDto, SkusPagination } from "@/modules/skus/api/types";

export interface SkuSliceRowDto {
  productId: string;
  stock: number;
  price: number;
  sku: SkuDto | null;
}

export interface SkuSlicePagePayload {
  konkName: string;
  date: string;
  items: SkuSliceRowDto[];
}

export interface SkuSlicePageResponseDto {
  message: string;
  data: SkuSlicePagePayload;
  pagination: SkusPagination;
}

export interface GetSkuSlicePageParams {
  konkName: string;
  date: string;
  page: number;
  limit: number;
  /** Якщо true — у запит додається isInvalid=true (лише проблемні позиції зрізу). */
  showInvalidOnly?: boolean;
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

export interface CompensatingSliceRefetchStatsDto {
  refetched: number;
  updated: number;
}

export interface RunCompensatingSliceBodyDto {
  konkName: string;
}

export interface RunCompensatingSliceDataDto {
  konkName: string;
  sliceDate: string;
  analog: CompensatingSliceRefetchStatsDto;
  sku: CompensatingSliceRefetchStatsDto;
}

export interface RunCompensatingSliceResponseDto {
  message: string;
  data: RunCompensatingSliceDataDto;
}

export interface RunCompensatingSliceParams {
  konkName: string;
  signal?: AbortSignal;
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
