import { apiClient } from "@/lib/apiClient";
import type { MutationResponse } from "@/types/api";
import type {
  CreateExcelJobBody,
  CreateExcelJobResult,
} from "@/modules/excel-jobs/api/types";

export async function createExcelJob(
  body: CreateExcelJobBody,
): Promise<CreateExcelJobResult> {
  const res = await apiClient.post<MutationResponse<CreateExcelJobResult>>(
    "excel-jobs",
    body,
  );
  return res.data.data;
}
