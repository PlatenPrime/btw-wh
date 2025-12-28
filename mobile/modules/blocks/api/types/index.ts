// Типы для Block (блок)

export interface BlockDto {
  _id: string;
  title: string;
  order: number;
  segs: string[]; // Array of Segment ObjectIds
  createdAt: string;
  updatedAt: string;
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

// Типы для Segment (сегмент)

export interface SegmentDto {
  _id: string;
  block: string; // Block ObjectId
  blockData: {
    _id: string;
    title: string;
  };
  sector: number;
  order: number;
  zones: Array<{
    _id: string;    // Zone ObjectId
    title: string;   // Zone title (cached)
  }>;
  createdAt: string;
  updatedAt: string;
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

// Типы для Zone (зона)

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

