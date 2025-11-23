import { apiClient } from "@/lib/apiClient";
import type { DeleteArtsWithoutLatestMarkerResponse } from "@/modules/arts/api/types/dto";

export const deleteArtsWithoutLatestMarker =
  async (): Promise<DeleteArtsWithoutLatestMarkerResponse["result"]> => {
    const res = await apiClient.delete<DeleteArtsWithoutLatestMarkerResponse>(
      "/arts/without-latest-marker",
    );
    return res.data.result;
  };

