import type { EntityResponse } from "@/types/api";

export interface BtradeStockDto {
  value: number;
  date: string;
  _id: string;
}

export interface ArtDto {
  _id: string;
  artikul: string;
  nameukr: string;
  namerus: string;
  zone: string;
  limit?: number;
  marker?: string;
  __v: number;
  btradeStock: BtradeStockDto;
}

export type ArtResponse = EntityResponse<ArtDto>;

export interface ArtsDto {
  data: ArtDto[];
  total: number;
  page: number;
  totalPages: number;
}

export interface BtradeArtInfoDto {
  nameukr: string;
  price: number;
  quantity: number;
}

export type BtradeArtInfoResponse = EntityResponse<BtradeArtInfoDto>;

export interface UpdateBtradeStockResponse {
  message: string;
  data: ArtDto;
}

export interface UpdateAllBtradeStocksResponse {
  message: string;
}

export interface ExportArtsResponse {
  blob: Blob;
  filename: string;
}

export interface ExportArtsWithStocksResponse {
  blob: Blob;
  filename: string;
}

export interface DeleteArtsWithoutLatestMarkerResult {
  deletedCount: number;
  latestMarker: string | null;
}

export interface DeleteArtsWithoutLatestMarkerResponse {
  message: string;
  result: DeleteArtsWithoutLatestMarkerResult;
}