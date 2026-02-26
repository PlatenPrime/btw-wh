import { apiClient } from "@/lib/apiClient";
import type {
  AnalogResponseDto,
  CreateAnalogDto,
} from "@/modules/analogs/api/types";

export const createAnalog = async (
  data: CreateAnalogDto,
): Promise<AnalogResponseDto> => {
  const res = await apiClient.post<AnalogResponseDto>("/analogs", data);
  return res.data;
};
