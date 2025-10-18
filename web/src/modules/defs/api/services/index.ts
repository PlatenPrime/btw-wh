// Адаптеры для defs сервисов из shared
import { apiClient } from "@/lib/apiClient";
import {
  createCalculateDefsService,
  createGetCalculationStatusService,
  createGetLatestDefsService,
} from "@shared/modules/defs";

// Queries
export const getLatestDefs = createGetLatestDefsService(apiClient);
export const getCalculationStatus =
  createGetCalculationStatusService(apiClient);

// Mutations
export const calculateDefs = createCalculateDefsService(apiClient);
