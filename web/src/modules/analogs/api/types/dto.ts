export interface AnalogDto {
  _id: string;
  konkName: string;
  prodName: string;
  artikul: string;
  nameukr?: string;
  url: string;
  title?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KonkProdRef {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
}

export interface EnrichedAnalogDto extends AnalogDto {
  konk: KonkProdRef;
  prod: KonkProdRef;
}

export interface AnalogsPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface AnalogsResponseDto {
  message: string;
  data: AnalogDto[];
  pagination: AnalogsPagination;
}

export interface GetAnalogsParams {
  page: number;
  limit: number;
  konkName?: string;
  prodName?: string;
  signal?: AbortSignal;
}

export interface CreateAnalogDto {
  konkName: string;
  prodName: string;
  url: string;
  artikul?: string;
  title?: string;
  imageUrl?: string;
}

export interface UpdateAnalogDto {
  konkName?: string;
  prodName?: string;
  artikul?: string;
  nameukr?: string;
  url?: string;
  title?: string;
  imageUrl?: string;
}

export interface AnalogResponseDto {
  message: string;
  data: AnalogDto;
}

export interface EnrichedAnalogResponseDto {
  message: string;
  data: EnrichedAnalogDto;
}
