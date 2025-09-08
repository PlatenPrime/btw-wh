// Типы для Pallet

import type { IPos } from "@/modules/poses/api/types/index";

export interface PalletShortDto {
  _id: string;
  title: string;
  sector?: string;
  isEmpty: boolean;
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
}

export interface UpdatePalletDto {
  title?: string;
  row?: string;
  sector?: string;
}

export type PalletListResponse = IPallet[];
export type PalletShortListResponse = PalletShortDto[];
export type PalletResponse = IPallet;


export interface DeletePalletResponse {
  message: string;
}


export interface ClearPalletResponse {
  message: string;
}