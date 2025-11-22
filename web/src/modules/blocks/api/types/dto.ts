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

/**
 * Ответ API для получения всех блоков
 * Всегда возвращает HTTP 200, проверяйте флаг exists для определения наличия данных
 */
export interface BlocksResponseDto {
  exists: boolean;
  message: string;
  data: BlockDto[];
}

/**
 * Ответ API для получения одного блока
 * Всегда возвращает HTTP 200, проверяйте флаг exists для определения наличия блока
 */
export interface BlockResponse {
  exists: boolean;
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

/**
 * Ответ API для пересчета секторов зон
 */
export interface RecalculateZonesSectorsResponse {
  message: string;
  data: {
    updatedZones: number;
    blocksProcessed: number;
  };
}

/**
 * Ответ API для сброса секторов зон (утилитарный эндпоинт)
 */
export interface ResetZonesSectorsResponse {
  message: string;
  data: {
    matchedCount: number;
    modifiedCount: number;
  };
}

