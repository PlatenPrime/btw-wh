// Типы для Pallet

import type { IPos } from "@/modules/poses/api/types/index";
import type { EntityResponse } from "@/types/api";

export interface PalletShortDto {
  _id: string;
  title: string;
  sector?: string;
  isEmpty: boolean;
  isDef: boolean;
}

export interface PalletRowData {
  _id: string;
  title: string;
}

export interface IPallet {
  _id: string;
  title: string;
  row: string;
  rowData: PalletRowData;
  poses: IPos[];
  sector?: string;
  isDef: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface RowData {
  _id: string;
  title: string;
}

export interface CreatePalletDto {
  title: string;
  rowData: RowData;
  sector?: string;
  isDef: boolean;
}

export interface UpdatePalletDto {
  title?: string;
  row?: string;
  sector?: string;
  isDef?: boolean;
}

export type PalletListResponse = IPallet[];
export type PalletShortListResponse = PalletShortDto[];

export type PalletResponse = EntityResponse<IPallet>;

export interface DeletePalletResponse {
  message: string;
}

export interface ClearPalletResponse {
  message: string;
}
