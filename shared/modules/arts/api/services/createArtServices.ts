import type { AxiosInstance } from "axios";
import { createUpdateArtLimitByIdService } from "./mutations/updateArtLimitById";
import { createGetArtsByParamsService } from "./queries/getArtsByParams";
import { createGetBtradeArtDataByArtikulService } from "./queries/getBtradeArtDataByArtikul";
import { createGetOneArtByArtikulService } from "./queries/getOneArtByArtikul";

/**
 * Factory для создания всех art сервисов
 */
export const createArtServices = (apiClient: AxiosInstance) => ({
  getArtsByParams: createGetArtsByParamsService(apiClient),
  getOneArtByArtikul: createGetOneArtByArtikulService(apiClient),
  getBtradeArtDataByArtikul: createGetBtradeArtDataByArtikulService(apiClient),
  updateArtLimitById: createUpdateArtLimitByIdService(apiClient),
});

export type ArtServices = ReturnType<typeof createArtServices>;
