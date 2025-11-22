import { apiClient } from "@/lib/apiClient";
import type { RecalculateZonesSectorsResponse } from "@/modules/blocks/api/types";

/**
 * Пересчет секторов зон - это ресурсоемкая операция, которая может занимать много времени.
 * Увеличиваем timeout до 60 секунд, чтобы избежать ошибок при долгих операциях.
 */
export const recalculateZonesSectors = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<RecalculateZonesSectorsResponse> => {
  const res = await apiClient.post<RecalculateZonesSectorsResponse>(
    "/blocks/recalculate-zones-sectors",
    {},
    {
      signal,
      timeout: 60000, // 60 секунд для долгих операций пересчета
    }
  );

  return res.data;
};

