import { apiClient } from "@/lib/apiClient";
import type { ExportArtsResponse } from "@/modules/arts/api/types/dto";

export const exportArts = async (): Promise<ExportArtsResponse> => {
  const res = await apiClient.get("/arts/export", {
    responseType: "blob",
  });

  // Extract filename from Content-Disposition header
  const contentDisposition = res.headers["content-disposition"];
  const filename = contentDisposition
    ? contentDisposition.split("filename=")[1]?.replace(/"/g, "") || "arts_export.xlsx"
    : "arts_export.xlsx";

  return {
    blob: res.data,
    filename,
  };
};

