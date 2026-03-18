export interface VariantGroupDto {
  id: string;
  title: string;
}

export interface VariantDto {
  _id: string;
  konkName: string;
  prodName: string;
  title: string;
  url: string;
  /**
   * Опциональная группа вариантов.
   * Формат: `{ id, title }`
   */
  varGroup?: VariantGroupDto;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface VariantsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface VariantsResponseDto {
  message: string;
  data: VariantDto[];
  pagination: VariantsPagination;
}

export interface GetVariantsParams {
  page: number;
  limit: number;
  konkName?: string;
  prodName?: string;
  search?: string;
  signal?: AbortSignal;
}

export interface VariantResponseDto {
  message: string;
  data: VariantDto;
}

export interface CreateVariantDto {
  konkName: string;
  prodName: string;
  title: string;
  url: string;
  imageUrl: string;
  varGroup?: VariantGroupDto;
}

export interface UpdateVariantDto {
  konkName?: string;
  prodName?: string;
  title?: string;
  url?: string;
  imageUrl?: string;
  varGroup?: VariantGroupDto;
}

