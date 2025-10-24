import type { PalletShortDto } from "@/modules/pallets/api/types";
import type { EntityResponse } from "@/types/api";

export interface RowDto {
  _id: string;
  title: string;
  pallets: PalletShortDto[];
  createdAt: string;
  updatedAt: string;
}

export type RowResponse = EntityResponse<RowDto>;

export interface CreateRowDto {
  title: string;
}

export interface UpdateRowDto {
  title?: string;
}

export interface DeleteRowResponse {
  message: string;
}
