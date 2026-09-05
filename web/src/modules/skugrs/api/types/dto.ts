export interface SkugrDto {
  _id: string;
  konkName: string;
  prodName: string;
  title: string;
  url: string;
  isSliced: boolean;
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
  isSliced?: boolean;
  signal?: AbortSignal;
}

export interface CreateSkugrDto {
  konkName: string;
  prodName: string;
  title: string;
  url: string;
  isSliced?: boolean;
  skus?: string[];
}

export interface UpdateSkugrDto {
  konkName?: string;
  prodName?: string;
  title?: string;
  url?: string;
  isSliced?: boolean;
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

export interface ClearSkugrSkusResponseDto {
  message: string;
  data: SkugrDto;
}

export interface DeleteSkugrWithSkusResponseDto {
  message: string;
  data: { deletedSkusCount: number; modifiedSkugrsCount: number };
}

export interface FillSkugrSkusStats {
  fetched: number;
  dedupedByUrl: number;
  skippedAlreadyInGroup: number;
  skippedNoProductId: number;
  skippedProductIdConflict: number;
  skippedNonNewskuManufacturer: number;
  promotedFromNewsku: number;
  linkedExisting: number;
  created: number;
}

export const EMPTY_FILL_SKUGR_SKUS_STATS: FillSkugrSkusStats = {
  fetched: 0,
  dedupedByUrl: 0,
  skippedAlreadyInGroup: 0,
  skippedNoProductId: 0,
  skippedProductIdConflict: 0,
  skippedNonNewskuManufacturer: 0,
  promotedFromNewsku: 0,
  linkedExisting: 0,
  created: 0,
};

export function addFillSkugrSkusStats(
  left: FillSkugrSkusStats,
  right: FillSkugrSkusStats,
): FillSkugrSkusStats {
  return {
    fetched: (left.fetched ?? 0) + (right.fetched ?? 0),
    dedupedByUrl: (left.dedupedByUrl ?? 0) + (right.dedupedByUrl ?? 0),
    skippedAlreadyInGroup:
      (left.skippedAlreadyInGroup ?? 0) + (right.skippedAlreadyInGroup ?? 0),
    skippedNoProductId:
      (left.skippedNoProductId ?? 0) + (right.skippedNoProductId ?? 0),
    skippedProductIdConflict:
      (left.skippedProductIdConflict ?? 0) + (right.skippedProductIdConflict ?? 0),
    skippedNonNewskuManufacturer:
      (left.skippedNonNewskuManufacturer ?? 0) +
      (right.skippedNonNewskuManufacturer ?? 0),
    promotedFromNewsku:
      (left.promotedFromNewsku ?? 0) + (right.promotedFromNewsku ?? 0),
    linkedExisting: (left.linkedExisting ?? 0) + (right.linkedExisting ?? 0),
    created: (left.created ?? 0) + (right.created ?? 0),
  };
}

export interface FillSkugrSkusBody {
  maxPages?: number;
}

export interface FillSkugrSkusResponseDto {
  message: string;
  data: SkugrDto;
  stats: FillSkugrSkusStats;
}

/** Позиція черги клієнтського refill Air-групи (GET /skugrs/client/air/pending). */
export interface AirClientSkugrPendingItemDto {
  skugrId: string;
  title: string;
  url: string;
  prodName: string;
}

export interface AirClientSkugrPendingPayload {
  items: AirClientSkugrPendingItemDto[];
}

export interface AirClientSkugrPendingResponseDto {
  message: string;
  data: AirClientSkugrPendingPayload;
}

/** Body для POST /skugrs/client/air/id/:id/fill-page. */
export interface FillAirClientSkugrPageBodyDto {
  sourceUrl: string;
  pageUrl: string;
  html: string;
}

export interface FillAirClientSkugrPageDataDto {
  stats: FillSkugrSkusStats;
  nextPageUrl: string | null;
  productsOnPage: number;
}

export interface FillAirClientSkugrPageResponseDto {
  message: string;
  data: FillAirClientSkugrPageDataDto;
}

export interface FillAirClientSkugrPageParams {
  skugrId: string;
  body: FillAirClientSkugrPageBodyDto;
  signal?: AbortSignal;
}

export interface AirClientApiError {
  message: string;
  code?: string;
  errors?: Array<{ path: string[]; message: string }>;
}

export interface SkugrDailySummaryItem {
  date: string;
  stock: number;
  sales: number;
  revenue: number;
}

export interface SkugrDailySummaryResponseDto {
  message: string;
  data: SkugrDailySummaryItem[];
}
