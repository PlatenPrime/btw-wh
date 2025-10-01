export interface ExistingAsk {
  _id: string;
  status: string;
  createdAt: string;
  askerName: string;
  askerId: string;
}

export interface DeficitItem {
  nameukr: string; // Название товара на украинском
  quant: number; // Текущий остаток на складе
  sharikQuant: number; // Остаток по данным Sharik
  difQuant: number; // Разница (sharikQuant - quant)
  defLimit: number; // Сумма лимита артикула и quant
  existingAsk: ExistingAsk | null; // Информация о существующей заявке
}

export interface DeficitCalculationResult {
  [artikul: string]: DeficitItem;
}

export interface Defcalc {
  _id: string;
  result: DeficitCalculationResult; // Объект с дефицитами по артикулам
  total: number; // Общее количество найденных дефицитов
  totalCriticalDefs: number; // Критические дефициты (sharikQuant <= quant)
  totalLimitDefs: number; // Дефициты в лимите (sharikQuant <= defLimit но > quant)
  createdAt: string; // Дата создания
  updatedAt: string; // Дата обновления
  __v: number;
}

export interface CalculateDefsResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    totalCriticalDefs: number;
    totalLimitDefs: number;
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
  currentStep?: string;
  totalItems?: number;
  processedItems?: number;
}

export interface DefsCalculationStatusResponse {
  success: boolean;
  data: DefsCalculationStatus;
}
