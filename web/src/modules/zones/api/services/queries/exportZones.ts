import { apiClient } from "@/lib/apiClient";
import type { ExportZonesResponse } from "@/modules/zones/api/types";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export const exportZones = async (): Promise<ExportZonesResponse> => {
  const res = await apiClient.get("/zones/export", {
    responseType: "blob",
  });

  const contentDisposition = res.headers["content-disposition"];
  const filename = parseContentDisposition(contentDisposition, "zones_export.xlsx");

  return {
    blob: res.data,
    filename,
  };
};



