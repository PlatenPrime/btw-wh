import { apiClient } from "@/lib/apiClient";
import type {
  IProcessPullPositionRequest,
  ProcessPullPositionResponse,
} from "@/modules/pulls/api/types/dto";

export interface ProcessPullPositionParams {
  palletId: string;
  posId: string;
  data: IProcessPullPositionRequest;
}

export const processPullPosition = async ({
  palletId,
  posId,
  data,
}: ProcessPullPositionParams): Promise<ProcessPullPositionResponse> => {
  const res = await apiClient.patch<ProcessPullPositionResponse>(
    `/pulls/${palletId}/positions/${posId}`,
    data,
  );

  return res.data;
};

