import type { AxiosInstance } from "axios";
import type { BtradeArtInfoDto } from "../../types/dto";

/**
 * Get btrade art data by artikul service factory
 */
export const createGetBtradeArtDataByArtikulService = (
  apiClient: AxiosInstance
) => {
  return async (
    artikul: string,
    signal?: AbortSignal
  ): Promise<BtradeArtInfoDto> => {
    const res = await apiClient.get<BtradeArtInfoDto>(
      `/arts/btrade/${artikul}`,
      {
        signal,
      }
    );
    return res.data;
  };
};
