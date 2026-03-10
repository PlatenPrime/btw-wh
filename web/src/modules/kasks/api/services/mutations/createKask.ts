import { apiClient } from "@/lib/apiClient";
import type { CreateKaskDto, KaskDto } from "@/modules/kasks/api/types/dto";

/** Викидує ключі з undefined, щоб бек не отримував quant: undefined у JSON */
function stripUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as T;
}

export const createKask = async (data: CreateKaskDto): Promise<KaskDto> => {
  const body = stripUndefined({ ...data });
  const res = await apiClient.post<KaskDto>("/kasks", body);
  return res.data;
};
