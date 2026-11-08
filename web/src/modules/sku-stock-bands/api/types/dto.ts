import type { DeleteResponse, MutationResponse } from "@/types/api";

export interface SkuStockBandKonkDto {
  name: string;
  title: string;
}

export interface SkuStockBandDto {
  _id: string;
  konk: SkuStockBandKonkDto;
  stockMin: number;
  stockMax: number;
  normalMax: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSkuStockBandDto {
  konkName: string;
  stockMin: number;
  stockMax: number;
  normalMax: number;
}

export interface UpdateSkuStockBandDto {
  konkName?: string;
  stockMin?: number;
  stockMax?: number;
  normalMax?: number;
}

export interface GetSkuStockBandsParams {
  konkName?: string;
  signal?: AbortSignal;
}

export type SkuStockBandsListResponse = {
  message: string;
  data: SkuStockBandDto[];
};

export type SkuStockBandResponse = MutationResponse<SkuStockBandDto>;
export type DeleteSkuStockBandResponse = DeleteResponse<SkuStockBandDto>;

export interface DiscoverStockBandBodyDto {
  dateFrom: string;
  dateTo: string;
}

export interface DiscoverStockBandRunDto {
  dateFrom: string;
  dateTo: string;
  peakStock: number;
}

export interface DiscoverStockBandItemDto {
  skuId: string | null;
  productId: string;
  title: string | null;
  imageUrl: string | null;
  runs: DiscoverStockBandRunDto[];
}

export interface DiscoverStockBandPayload {
  bandId: string;
  konkName: string;
  window: { dateFrom: string; dateTo: string };
  band: { min: number; max: number; normalMax: number };
  items: DiscoverStockBandItemDto[];
}

export interface DiscoverStockBandResponseDto {
  message: string;
  data: DiscoverStockBandPayload;
}

export interface DiscoverStockBandParams extends DiscoverStockBandBodyDto {
  bandId: string;
  signal?: AbortSignal;
}
