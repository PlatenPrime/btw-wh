import { apiClient } from "@/lib/apiClient";
import type {
  DeleteOrphanSkusQueryDto,
  DeleteOrphanSkusResponseDto,
} from "@/modules/skus/api/types";

export const deleteOrphanSkus = async (
  filters: DeleteOrphanSkusQueryDto = {},
  signal?: AbortSignal,
): Promise<DeleteOrphanSkusResponseDto> => {
  const params = new URLSearchParams();
  if (filters.konkName?.trim()) params.set("konkName", filters.konkName.trim());
  if (filters.prodName?.trim()) params.set("prodName", filters.prodName.trim());
  if (filters.search?.trim()) params.set("search", filters.search.trim());
  if (typeof filters.isInvalid === "boolean") {
    params.set("isInvalid", String(filters.isInvalid));
  }
  if (filters.createdFrom?.trim()) {
    params.set("createdFrom", filters.createdFrom.trim());
  }
  const qs = params.toString();
  const path = qs
    ? `skus/not-in-any-skugr?${qs}`
    : "skus/not-in-any-skugr";
  const res = await apiClient.delete<DeleteOrphanSkusResponseDto>(path, {
    signal,
  });
  return res.data;
};
