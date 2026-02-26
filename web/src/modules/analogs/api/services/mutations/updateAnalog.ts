import { apiClient } from "@/lib/apiClient";
import type {
  AnalogResponseDto,
  UpdateAnalogDto,
} from "@/modules/analogs/api/types";

export const updateAnalog = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateAnalogDto;
}): Promise<AnalogResponseDto> => {
  const res = await apiClient.patch<AnalogResponseDto>(
    `/analogs/id/${id}`,
    data,
  );
  return res.data;
};
