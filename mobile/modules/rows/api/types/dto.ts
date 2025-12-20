// Типы для Row

export interface PalletShortDto {
  _id: string;
  title: string;
  sector?: string;
  isEmpty: boolean;
  isDef: boolean;
}

export interface RowDto {
  _id: string;
  title: string;
  pallets: PalletShortDto[];
  createdAt: string;
  updatedAt: string;
}

export interface RowResponse {
  data: RowDto;
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

