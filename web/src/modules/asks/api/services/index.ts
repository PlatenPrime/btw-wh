// Адаптеры для asks сервисов из shared
import { apiClient } from "@/lib/apiClient";
import {
  createCompleteAskByIdService,
  createCreateAskService,
  createDeleteAskByIdService,
  createGetAskByIdService,
  createGetAsksByDateService,
  createRejectAskByIdService,
  createUpdateAskActionsByIdService,
  createUpdateAskByIdService,
} from "@shared/modules/asks";

// Queries
export const getAskById = createGetAskByIdService(apiClient);
export const getAsksByDate = createGetAsksByDateService(apiClient);

// Mutations
export const createAsk = createCreateAskService(apiClient);
export const updateAskById = createUpdateAskByIdService(apiClient);
export const deleteAskById = createDeleteAskByIdService(apiClient);
export const completeAskById = createCompleteAskByIdService(apiClient);
export const rejectAskById = createRejectAskByIdService(apiClient);
export const updateAskActionsById =
  createUpdateAskActionsByIdService(apiClient);
