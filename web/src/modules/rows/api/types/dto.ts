import type { PalletShortListResponse } from "@/modules/pallets/api/types";


export interface RowDto {
  _id: string;
  title: string;
  pallets: PalletShortListResponse[];
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
