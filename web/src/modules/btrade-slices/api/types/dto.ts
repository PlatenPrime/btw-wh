import type { ArtDto } from "@/modules/arts/api/types/dto";
import type { SkusPagination } from "@/modules/skus/api/types";

export interface BtradeSliceRowDto {
  artikul: string;
  quantity: number;
  price: number;
  art: ArtDto | null;
}

export interface BtradeSlicePagePayload {
  date: string;
  items: BtradeSliceRowDto[];
}

export interface BtradeSlicePageResponseDto {
  message: string;
  data: BtradeSlicePagePayload;
  pagination: SkusPagination;
}

export interface GetBtradeSlicePageParams {
  date: string;
  page: number;
  limit: number;
  /** Якщо true — у запит додається isInvalid=true (лише проблемні позиції зрізу). */
  showInvalidOnly?: boolean;
  signal?: AbortSignal;
}
