export interface SkuDto {
  _id: string;
  konkName: string;
  prodName: string;
  productId: string;
  btradeAnalog: string;
  title: string;
  url: string;
  imageUrl: string;
  isInvalid?: boolean;
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
  konkName?: string;
  prodName?: string;
  search?: string;
  isInvalid?: boolean;
  createdFrom?: string;
  /** GET /skus — лише SKU, чиї _id не входять до жодного skugr.skus */
  notInAnySkugr?: boolean;
  signal?: AbortSignal;
}

/** Query для DELETE /skus/not-in-any-skugr (без пагінації) */
export interface DeleteOrphanSkusQueryDto {
  konkName?: string;
  prodName?: string;
  search?: string;
  isInvalid?: boolean;
  createdFrom?: string;
}

export interface DeleteOrphanSkusResponseDto {
  message: string;
  deletedCount: number;
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
