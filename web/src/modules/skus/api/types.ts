export interface SkuDto {
  _id: string;
  konkName: string;
  prodName: string;
  productId: string;
  btradeAnalog: string;
  title: string;
  url: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface SkusPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SkusResponseDto {
  message: string;
  data: SkuDto[];
  pagination: SkusPagination;
}

export interface GetSkusParams {
  page: number;
  limit: number;
  konkName: string;
  prodName?: string;
  search?: string;
  signal?: AbortSignal;
}

export interface GetSkusBySkugrParams {
  skugrId: string;
  page: number;
  limit: number;
  search?: string;
  signal?: AbortSignal;
}

export interface SkuByIdResponseDto {
  message: string;
  data: SkuDto;
}

export interface SkuSliceRangeItem {
  date: string;
  stock: number;
  price: number;
}

export interface SkuSliceRangeResponseDto {
  message: string;
  data: SkuSliceRangeItem[];
}

export interface SkuSalesRangeItem {
  date: string;
  sales: number;
  revenue: number;
  price: number;
  isDeliveryDay: boolean;
}

export interface SkuSalesRangeResponseDto {
  message: string;
  data: SkuSalesRangeItem[];
}
