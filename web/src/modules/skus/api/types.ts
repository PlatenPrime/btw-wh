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
  signal?: AbortSignal;
}

export interface SkuByIdResponseDto {
  message: string;
  data: SkuDto;
}
