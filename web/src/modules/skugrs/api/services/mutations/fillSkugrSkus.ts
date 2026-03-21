import { apiClient } from "@/lib/apiClient";
import type {
  FillSkugrSkusBody,
  FillSkugrSkusResponseDto,
} from "@/modules/skugrs/api/types";

export const fillSkugrSkus = async ({
  id,
  body,
}: {
  id: string;
  body?: FillSkugrSkusBody;
}): Promise<FillSkugrSkusResponseDto> => {
  const res = await apiClient.post<FillSkugrSkusResponseDto>(
    `/skugrs/id/${id}/fill-skus`,
    body ?? {},
  );
  return res.data;
};
