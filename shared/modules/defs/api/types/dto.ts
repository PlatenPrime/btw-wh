export interface ExistingAsk {
  _id: string;
  status: string;
  createdAt: string;
  askerName: string;
  askerId: string;
}

export interface DeficitItem {
  nameukr: string;
  quant: number;
  sharikQuant: number;
  difQuant: number;
  defLimit: number;
  status: "limited" | "critical";
  existingAsk: ExistingAsk | null;
}

export interface DeficitCalculationResult {
  [artikul: string]: DeficitItem;
}

export interface Def {
  _id: string;
  result: DeficitCalculationResult;
  total: number;
  totalCriticalDefs: number;
  totalLimitDefs: number;
  createdAt: string;
  updatedAt: string;
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
  data: Def;
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
