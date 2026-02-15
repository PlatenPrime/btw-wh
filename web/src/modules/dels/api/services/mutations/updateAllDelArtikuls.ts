import { apiClient } from "@/lib/apiClient";

interface UpdateAllResponse {
  message: string;
}

export const updateAllDelArtikuls = async (id: string): Promise<UpdateAllResponse> => {
  const res = await apiClient.post<UpdateAllResponse>(
    `/dels/${id}/artikuls/update-all`,
    undefined,
    { validateStatus: (status) => status === 202 || status < 300 },
  );
  return res.data;
};
