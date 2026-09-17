import { apiClient } from "@/lib/apiClient";
import type { MutationResponse } from "@/types/api";
import type { ExcelJobDto } from "@/modules/excel-jobs/api/types";

export async function getExcelJob(jobId: string): Promise<ExcelJobDto> {
  const res = await apiClient.get<MutationResponse<ExcelJobDto>>(
    `excel-jobs/${encodeURIComponent(jobId)}`,
  );
  return res.data.data;
}
