// Адаптеры для rows сервисов из shared
import { apiClient } from "@/lib/apiClient";
import {
  createCreateRowService,
  createDeleteRowService,
  createGetRowByIdService,
  createGetRowByTitleService,
  createGetRowsService,
  createUpdateRowService,
} from "@shared/modules/rows";

// Queries
export const getRows = createGetRowsService(apiClient);
export const getRowById = createGetRowByIdService(apiClient);
export const getRowByTitle = createGetRowByTitleService(apiClient);

// Mutations
export const createRow = createCreateRowService(apiClient);
export const updateRow = createUpdateRowService(apiClient);
export const deleteRow = createDeleteRowService(apiClient);
