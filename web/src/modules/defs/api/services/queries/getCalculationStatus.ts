import { apiClient } from "@/lib/apiClient";
import type { DefsCalculationStatusResponse } from "@/modules/defs/api/types/dto";

export const getCalculationStatus =
  async (): Promise<DefsCalculationStatusResponse> => {
    const res = await apiClient.get<DefsCalculationStatusResponse>(
      "/defs/calculation-status",
    );
    return res.data;
  };
