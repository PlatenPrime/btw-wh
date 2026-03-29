export interface SkugrDto {
  _id: string;
  konkName: string;
  prodName: string;
  title: string;
  url: string;
  skus: string[];
  createdAt: string;
  updatedAt: string;
}

/** Відповідь GET /skugrs/id/:id — без поля skus (список SKU окремо GET /skus/by-skugr/:id) */
export type SkugrPageDto = Omit<SkugrDto, "skus">;

export interface SkugrsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SkugrsResponseDto {
  message: string;
  data: SkugrDto[];
  pagination: SkugrsPagination;
}

export interface GetSkugrsParams {
  page: number;
  limit: number;
  konkName?: string;
  prodName?: string;
  search?: string;
  signal?: AbortSignal;
}

export interface CreateSkugrDto {
  konkName: string;
  prodName: string;
  title: string;
  url: string;
  skus?: string[];
}

export interface UpdateSkugrDto {
  konkName?: string;
  prodName?: string;
  title?: string;
  url?: string;
}

export interface SkugrResponseDto {
  message: string;
  data: SkugrDto;
}

export interface SkugrPageResponseDto {
  message: string;
  data: SkugrPageDto;
}

export interface DeleteSkugrResponse {
  message: string;
}

export interface FillSkugrSkusStats {
  fetched: number;
  dedupedByUrl: number;
  skippedAlreadyInGroup: number;
  linkedExisting: number;
  created: number;
}

export interface FillSkugrSkusBody {
  maxPages?: number;
}

export interface FillSkugrSkusResponseDto {
  message: string;
  data: SkugrDto;
  stats: FillSkugrSkusStats;
}
