import { apiClient } from "@/lib/apiClient";
import type { ExportZonesResponse } from "@/modules/zones/api/types";

export const exportZones = async (): Promise<ExportZonesResponse> => {
  const res = await apiClient.get("/zones/export", {
    responseType: "blob",
  });

  // Extract filename from Content-Disposition header
  const contentDisposition = res.headers["content-disposition"];
  const filename = contentDisposition
    ? contentDisposition.split("filename=")[1]?.replace(/"/g, "") || "zones_export.xlsx"
    : "zones_export.xlsx";

  return {
    blob: res.data,
    filename,
  };
};

