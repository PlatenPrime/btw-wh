import type { PaginatedResponse } from "@/types/api";

export interface GraboSkuDto {
  _id: string;
  productId: string;
  title: string;
  url: string;
  isNewProduct: boolean;
  color: string;
  size: string;
  material: string;
  gas: string;
  language: string;
  gasCapacity: string;
  tags: string[];
  images: string[];
  isOnSite: boolean;
  lastSeenAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface GraboSkuFilterOptionsDto {
  color: string[];
  size: string[];
  material: string[];
  gas: string[];
  language: string[];
  gasCapacity: string[];
  tags: string[];
}

export const EMPTY_GRABO_SKU_FILTER_OPTIONS: GraboSkuFilterOptionsDto = {
  color: [],
  size: [],
  material: [],
  gas: [],
  language: [],
  gasCapacity: [],
  tags: [],
};

export interface GraboSkusResponseDto extends PaginatedResponse<GraboSkuDto> {
  filterOptions?: GraboSkuFilterOptionsDto;
}

export interface GraboSkuByIdResponseDto {
  message: string;
  data: GraboSkuDto;
}

export type GraboBooleanFilter = boolean | undefined;

export interface GetGraboSkusParams {
  page: number;
  limit: number;
  search?: string;
  color?: string;
  size?: string;
  material?: string;
  gas?: string;
  language?: string;
  gasCapacity?: string;
  tag?: string;
  isOnSite?: GraboBooleanFilter;
  isNewProduct?: GraboBooleanFilter;
  includeFilterOptions?: boolean;
  signal?: AbortSignal;
}

export interface DownloadGraboSkusExcelResult {
  blob: Blob;
  filename: string;
}
