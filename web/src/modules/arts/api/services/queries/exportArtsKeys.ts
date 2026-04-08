import { apiClient } from "@/lib/apiClient";
import type { ExportArtsKeysResponse } from "@/modules/arts/api/types/dto";
import { parseContentDisposition } from "@/utils/parseContentDisposition";

export const exportArtsKeys = async (): Promise<ExportArtsKeysResponse> => {
  const res = await apiClient.get("/arts/export-keys", {
    responseType: "blob",
  });

  const contentDisposition = res.headers["content-disposition"];
  const filename = parseContentDisposition(contentDisposition, "arts_export_keys.xlsx");

  return {
    blob: res.data,
    filename,
  };
};
