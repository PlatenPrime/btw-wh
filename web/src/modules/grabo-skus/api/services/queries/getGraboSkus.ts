import { apiClient } from "@/lib/apiClient";
import type {
  GetGraboSkusParams,
  GraboSkusResponseDto,
} from "@/modules/grabo-skus/api/types";

function setOptionalParam(
  params: URLSearchParams,
  key: string,
  value: string | undefined,
): void {
  const trimmed = value?.trim();
  if (trimmed) {
    params.set(key, trimmed);
  }
}

export const getGraboSkus = async ({
  page,
  limit,
  search,
  color,
  size,
  material,
  gas,
  language,
  gasCapacity,
  tag,
  isOnSite,
  isNewProduct,
  includeFilterOptions,
  signal,
}: GetGraboSkusParams): Promise<GraboSkusResponseDto> => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  setOptionalParam(params, "search", search);
  setOptionalParam(params, "color", color);
  setOptionalParam(params, "size", size);
  setOptionalParam(params, "material", material);
  setOptionalParam(params, "gas", gas);
  setOptionalParam(params, "language", language);
  setOptionalParam(params, "gasCapacity", gasCapacity);
  setOptionalParam(params, "tag", tag);

  if (typeof isOnSite === "boolean") {
    params.set("isOnSite", String(isOnSite));
  }
  if (typeof isNewProduct === "boolean") {
    params.set("isNewProduct", String(isNewProduct));
  }
  if (typeof includeFilterOptions === "boolean") {
    params.set("includeFilterOptions", String(includeFilterOptions));
  }

  const res = await apiClient.get<GraboSkusResponseDto>(
    `/grabo-skus?${params.toString()}`,
    { signal },
  );
  return res.data;
};
