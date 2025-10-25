export interface ZoneDto {
  _id: string;
  title: string;
  bar: number;
  sector: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateZoneDto {
  title: string;
  bar: number;
  sector?: number;
}

export interface UpdateZoneDto {
  title?: string;
  bar?: number;
  sector?: number;
}

export interface ZonesResponseDto {
  message: string;
  data: ZoneDto[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface GetZonesParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: "title" | "bar" | "sector" | "createdAt";
  sortOrder?: "asc" | "desc";
  signal?: AbortSignal;
}

export interface BulkCreateZoneDto {
  zones: Array<{
    title: string;
    bar: number;
  }>;
}

export interface UpsertZonesResponse {
  message: string;
  result: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedCount: number;
    upsertedIds: Record<string, string>;
  };
}

import type { EntityResponse } from "@/types/api";

export type ZoneResponse = EntityResponse<ZoneDto>;

export interface DeleteZoneResponse {
  message: string;
  data: ZoneDto;
}

export interface ExportZonesResponse {
  blob: Blob;
  filename: string;
}

