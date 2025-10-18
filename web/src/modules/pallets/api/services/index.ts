// Адаптеры для pallets сервисов из shared
import { apiClient } from "@/lib/apiClient";
import {
  createCreatePalletService,
  createDeletePalletEmptyPosesService,
  createDeletePalletPosesService,
  createDeletePalletService,
  createEmptyPalletPosesService,
  createGetAllPalletsService,
  createGetEmptyPalletsService,
  createGetPalletByIdService,
  createGetPalletsByRowIdService,
  createMovePalletPosesService,
  createUpdatePalletService,
} from "@shared/modules/pallets";

// Queries
export const getAllPallets = createGetAllPalletsService(apiClient);
export const getPalletById = createGetPalletByIdService(apiClient);
export const getPalletsByRowId = createGetPalletsByRowIdService(apiClient);
export const getEmptyPallets = createGetEmptyPalletsService(apiClient);

// Нужен адаптер для getPalletByTitle, если он существует
export const getPalletByTitle = async (title: string, signal?: AbortSignal) => {
  // Этот метод нужно реализовать, если используется
  const pallets = await getAllPallets(signal);
  const found = pallets.find((p) => p.title === title);
  if (!found) throw new Error("Pallet not found");
  return found;
};

// Mutations
export const createPallet = createCreatePalletService(apiClient);
export const updatePallet = createUpdatePalletService(apiClient);
export const deletePallet = createDeletePalletService(apiClient);
export const emptyPalletPoses = createEmptyPalletPosesService(apiClient);
export const deletePalletEmptyPoses =
  createDeletePalletEmptyPosesService(apiClient);
export const movePalletPoses = createMovePalletPosesService(apiClient);
export const deletePalletPoses = createDeletePalletPosesService(apiClient);
