export interface BlockDto {
  _id: string;
  title: string;
  order: number;
  segs: string[]; // Array of Segment ObjectIds
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlockDto {
  title: string;
}

export interface UpdateBlockDto {
  title?: string;
  order?: number;
  segs?: string[]; // Array of Segment ObjectIds
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

// Segment types
export interface SegmentDto {
  _id: string;
  block: string; // Block ObjectId
  blockData: {
    _id: string;
    title: string;
  };
  sector: number;
  order: number;
  zones: string[]; // Array of Zone ObjectIds
  createdAt: string;
  updatedAt: string;
}

export interface CreateSegmentDto {
  blockData: {
    _id: string;
    title: string;
  };
  order: number;
  zones: string[]; // Minimum 1 zone required
}

export interface UpdateSegmentDto {
  order?: number;
  zones?: string[]; // Minimum 1 zone required if provided
}

/**
 * Ответ API для получения всех сегментов
 * Всегда возвращает HTTP 200, проверяйте флаг exists для определения наличия данных
 */
export interface SegmentsResponseDto {
  exists: boolean;
  message: string;
  data: SegmentDto[];
}

/**
 * Ответ API для получения одного сегмента
 * Всегда возвращает HTTP 200, проверяйте флаг exists для определения наличия сегмента
 */
export interface SegmentResponse {
  exists: boolean;
  message: string;
  data: SegmentDto | null;
}

export interface DeleteSegmentResponse {
  message: string;
  data: SegmentDto;
}

// Расширенный тип зоны с сегментом
export interface ZoneWithSegmentDto {
  _id: string;
  title: string;
  bar: number;
  sector: number;
  seg?: {
    id: string;
  };
  createdAt: string;
  updatedAt: string;
}

/**
 * Ответ API для получения зон сегмента
 */
export interface ZonesBySegmentResponse {
  exists: boolean;
  message: string;
  data: ZoneWithSegmentDto[];
}

