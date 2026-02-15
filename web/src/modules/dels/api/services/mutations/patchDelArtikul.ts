import { apiClient } from "@/lib/apiClient";
import type { DelResponse } from "@/modules/dels/api/types";

export const patchDelArtikul = async ({
  id,
  artikul,
}: {
  id: string;
  artikul: string;
}): Promise<DelResponse> => {
  const res = await apiClient.patch<DelResponse>(
    `/dels/${id}/artikuls/${encodeURIComponent(artikul)}`,
  );
  return res.data;
};
