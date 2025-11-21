export interface BlockDto {
  _id: string;
  title: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlockDto {
  title: string;
}

export interface UpdateBlockDto {
  title?: string;
  order?: number;
  zones?: Array<{
    zoneId: string;
    order: number;
  }>;
}

export interface BlocksResponseDto {
  message: string;
  data: BlockDto[];
}

// API блоков возвращает { message, data } без поля exists
export interface BlockResponse {
  message: string;
  data: BlockDto | null;
}

export interface DeleteBlockResponse {
  message: string;
  data: BlockDto;
}

// Расширенный тип зоны с блоком (из документации)
export interface ZoneWithBlockDto {
  _id: string;
  title: string;
  bar: number;
  sector: number;
  block?: {
    id: string;
    title: string;
  };
  order?: number;
  createdAt: string;
  updatedAt: string;
}

