export interface RowDto {
  _id: string;
  title: string;
  pallets: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateRowDto {
  title: string;
}

export interface UpdateRowDto {
  title?: string;
  pallets?: string[];
}

export interface DeleteRowResponse {
  message: string;
}
