import { apiClient } from "@/lib/apiClient";

interface DeleteAnalogResponse {
  message: string;
}

export const deleteAnalog = async (
  id: string,
): Promise<DeleteAnalogResponse> => {
  const res = await apiClient.delete<DeleteAnalogResponse>(
    `/analogs/id/${id}`,
  );
  return res.data;
};
