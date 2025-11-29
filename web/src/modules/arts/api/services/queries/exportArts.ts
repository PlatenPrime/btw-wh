import { apiClient } from "@/lib/apiClient";
import type { ExportArtsResponse } from "@/modules/arts/api/types/dto";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export const exportArts = async (): Promise<ExportArtsResponse> => {
  const res = await apiClient.get("/arts/export", {
    responseType: "blob",
  });

  const contentDisposition = res.headers["content-disposition"];
  const filename = parseContentDisposition(
    contentDisposition,
    "arts_export.xlsx",
  );

  return {
    blob: res.data,
    filename,
  };
};
