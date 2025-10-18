import type { AxiosInstance } from "axios";
import type { DefsCalculationStatusResponse } from "../../types/dto";

export const createGetCalculationStatusService = (apiClient: AxiosInstance) => {
  return async (): Promise<DefsCalculationStatusResponse> => {
    const res = await apiClient.get<DefsCalculationStatusResponse>(
      "/defs/calculation-status"
    );
    return res.data;
  };
};
