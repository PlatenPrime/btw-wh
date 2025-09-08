import type { PalletShortDto } from "@/modules/pallets/api/types";

export interface RowDto {
  _id: string;
  title: string;
  pallets: PalletShortDto[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRowDto {
  title: string;
}

export interface UpdateRowDto {
  title?: string;
}

export interface DeleteRowResponse {
  message: string;
}
