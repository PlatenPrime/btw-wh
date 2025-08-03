// Типы для Position (Pos)

export interface PosPalletData {
  _id: string;
  title: string;
  sector?: string;
}

export interface PosRowData {
  _id: string;
  title: string;
}

export interface IPos {
  _id: string;
  pallet: string;
  row: string;
  palletData: PosPalletData;
  rowData: PosRowData;
  palletTitle: string;
  rowTitle: string;
  artikul: string;
  nameukr?: string;
  quant: number;
  boxes: number;
  date?: string;
  sklad?: string;
  createdAt?: string;
  updatedAt?: string;
  comment: string;
  limit?: number;
}

export interface CreatePosDto {
  pallet: string;
  row: string;
  artikul: string;
  quant: number;
  boxes: number;
  date?: string;
  sklad?: string;
  limit: number;
  comment: string;
}

export type UpdatePosDto = Partial<CreatePosDto>;

export interface BulkCreatePosDto {
  poses: CreatePosDto[];
}

export interface PosListResponse {
  data: IPos[];
  total: number;
  page: number;
  totalPages: number;
}

export type PosResponse = IPos; 