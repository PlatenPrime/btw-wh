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

export interface SkuKonkProdSkugrGroupsSalesResponseDto {
  message: string;
  data: SkuKonkProdSkugrGroupSalesItemDto[];
}
