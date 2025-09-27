export interface DeficitItem {
  nameukr?: string; // Название товара на украинском
  quant: number; // Текущий остаток на складе
  boxes: number; // Количество коробок
  sharikQuant: number; // Остаток по данным Sharik
  difQuant: number; // Разница (sharikQuant - quant)
  limit?: number; // Минимальный лимит товара
}

export interface DeficitCalculationResult {
  [artikul: string]: DeficitItem;
}

export interface Defcalc {
  _id: string;
  result: DeficitCalculationResult; // Объект с дефицитами по артикулам
  totalDeficits: number; // Общее количество дефицитных товаров
  totalItems: number; // Общее количество обработанных товаров
  createdAt: string; // Дата создания
  updatedAt: string; // Дата обновления
  __v: number;
}

export interface CalculateDefsResponse {
  success: boolean;
  message: string;
  data: {
    totalItems: number;
    totalDeficits: number;
    createdAt: string;
  };
}

export interface GetLatestDefsResponse {
  success: boolean;
  data: Defcalc;
  message?: string;
}

export interface DefsCalculationStatus {
  isRunning: boolean;
  progress?: number;
  estimatedTimeRemaining?: number;
  startedAt?: string;
  lastUpdate?: string;
}

export interface DefsCalculationStatusResponse {
  success: boolean;
  data: DefsCalculationStatus;
}
