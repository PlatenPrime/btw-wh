import { apiClient } from "@/lib/apiClient";

export interface DeleteInvalidSkusResponseDto {
  message: string;
  deletedCount: number;
}

export const deleteInvalidSkus = async (
  konkName: string,
  signal?: AbortSignal,
): Promise<DeleteInvalidSkusResponseDto> => {
  const path = `skus/konk/${encodeURIComponent(konkName)}/invalid`;
  const res = await apiClient.delete<DeleteInvalidSkusResponseDto>(path, {
    signal,
  });
  return res.data;
};
