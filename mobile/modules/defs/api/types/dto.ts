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
  result: DeficitCalculationResult;
  total: number;
  totalCriticalDefs: number;
  totalLimitDefs: number;
  calculatedAt: string;
}

export interface GetLatestDefsResponse {
  exists: boolean;
  data: Def;
  message?: string;
}
