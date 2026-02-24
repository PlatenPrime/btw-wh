import { apiClient } from "@/lib/apiClient";
import type {
  ConstantResponse,
  UpdateConstantDto,
} from "@/modules/constants/api/types";

export const updateConstant = async ({
  id,
  data,
}: {
  id: string;
  data: UpdateConstantDto;
}): Promise<ConstantResponse> => {
  const res = await apiClient.patch<ConstantResponse>(
    `/constants/id/${id}`,
    data,
  );
  return res.data;
};
