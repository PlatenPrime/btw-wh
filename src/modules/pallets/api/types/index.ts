// Типы для Pallet

export interface PalletRowData {
  _id: string;
  title: string;
}

export interface IPallet {
  _id: string;
  title: string;
  row: string;
  rowData: PalletRowData;
  poses: string[];
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
export type PalletResponse = IPallet;
