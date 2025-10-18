// Адаптеры для poses сервисов из shared
import { apiClient } from "@/lib/apiClient";
import {
  createBulkCreatePosesService,
  createCreatePosService,
  createDeletePosService,
  createGetAllPosesService,
  createGetPosByIdService,
  createGetPosesByArtikulService,
  createGetPosesByPalletIdService,
  createGetPosesByRowIdService,
  createUpdatePosService,
} from "@shared/modules/poses";

// Queries
export const getAllPoses = createGetAllPosesService(apiClient);
export const getPosById = createGetPosByIdService(apiClient);
export const getPosesByPalletId = createGetPosesByPalletIdService(apiClient);
export const getPosesByRowId = createGetPosesByRowIdService(apiClient);
export const getPosesByArtikul = createGetPosesByArtikulService(apiClient);

// Mutations
export const createPos = createCreatePosService(apiClient);
export const bulkCreatePoses = createBulkCreatePosesService(apiClient);
export const updatePos = createUpdatePosService(apiClient);
export const deletePos = createDeletePosService(apiClient);
