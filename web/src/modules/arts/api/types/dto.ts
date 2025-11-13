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