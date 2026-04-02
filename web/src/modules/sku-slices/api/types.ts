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
  signal?: AbortSignal;
}
