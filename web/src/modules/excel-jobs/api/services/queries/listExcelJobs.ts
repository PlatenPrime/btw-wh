import { apiClient } from "@/lib/apiClient";
import type { MutationResponse } from "@/types/api";
import type {
  ExcelJobDto,
  ExcelJobStatus,
} from "@/modules/excel-jobs/api/types";

export interface ListExcelJobsParams {
  status?: ExcelJobStatus | ExcelJobStatus[] | string;
}

export async function listExcelJobs(
  params?: ListExcelJobsParams,
): Promise<ExcelJobDto[]> {
  const query: Record<string, string> = {};
  if (params?.status !== undefined) {
    query.status = Array.isArray(params.status)
      ? params.status.join(",")
      : params.status;
  }

  const res = await apiClient.get<MutationResponse<ExcelJobDto[]>>(
    "excel-jobs",
    { params: query },
  );
  return res.data.data;
}
