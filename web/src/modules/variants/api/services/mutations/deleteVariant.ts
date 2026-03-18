import { apiClient } from "@/lib/apiClient";

interface DeleteVariantResponseDto {
  message: string;
}

export const deleteVariant = async (
  id: string,
): Promise<DeleteVariantResponseDto> => {
  const res = await apiClient.delete<DeleteVariantResponseDto>(
    `/variants/id/${id}`,
  );
  return res.data;
};

