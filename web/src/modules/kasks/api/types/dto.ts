/**
 * Kask — запит доставити товар до каси (документація: web/src/doc/backend/api/kasks.md)
 * Обов'язкові при створенні: artikul, nameukr, zone; quant і com — опціональні.
 */
export interface KaskDto {
  _id: string;
  artikul: string;
  nameukr: string;
  zone: string;
  quant?: number;
  com?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateKaskDto {
  artikul: string;
  nameukr: string;
  zone: string;
  quant?: number;
  com?: string;
}

export interface UpdateKaskDto {
  artikul?: string;
  nameukr?: string;
  quant?: number;
  zone?: string;
  com?: string;
}

export interface GetKasksByDateResponse {
  message: string;
  data: KaskDto[];
  count: number;
}

export interface GetKaskByIdResponse {
  exists: boolean;
  message: string;
  data: KaskDto | null;
}

export interface UpdateKaskResponse {
  message: string;
  data: KaskDto;
}

export interface DeleteKaskResponse {
  message: string;
  data: { id: string; artikul: string };
}
