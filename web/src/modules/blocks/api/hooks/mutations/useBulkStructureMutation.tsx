import {
  useMutation,
  useQueryClient,
  type QueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { bulkUpsertBlocks } from "@/modules/blocks/api/services/mutations/bulkUpsertBlocks";
import { bulkUpsertSegments } from "@/modules/blocks/api/services/mutations/bulkUpsertSegments";
import type {
  BulkUpsertBlockPayload,
  BulkUpsertSegmentPayload,
} from "@/modules/blocks/api/types";

type BulkScope = "blocks" | "segs" | "all";

interface BulkStructureVariables {
  scope?: BulkScope;
  blocksPayload?: BulkUpsertBlockPayload[];
  segsPayload?: BulkUpsertSegmentPayload[];
  optimisticUpdater?: (queryClient: QueryClient) => (() => void) | void;
  extraInvalidations?: Array<unknown[]>;
}

interface ApiErrorResponse {
  message?: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
}

export function useBulkStructureMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      scope = "all",
      blocksPayload,
      segsPayload,
    }: BulkStructureVariables) => {
      const requests: Array<Promise<unknown>> = [];

      if (
        (scope === "blocks" || scope === "all") &&
        blocksPayload &&
        blocksPayload.length > 0
      ) {
        requests.push(bulkUpsertBlocks(blocksPayload));
      }

      if (
        (scope === "segs" || scope === "all") &&
        segsPayload &&
        segsPayload.length > 0
      ) {
        requests.push(bulkUpsertSegments(segsPayload));
      }

      if (requests.length === 0) {
        return null;
      }

      await Promise.all(requests);
      return null;
    },
    onMutate: async ({ optimisticUpdater }) => {
      const rollback = optimisticUpdater?.(queryClient);

      return { rollback };
    },
    onError: (error: AxiosError<ApiErrorResponse>, _, context) => {
      context?.rollback?.();

      const apiError = error.response?.data;
      if (apiError?.errors?.length) {
        const details = apiError.errors
          .map((item) => `${item.path.join(".")}: ${item.message}`)
          .join(", ");
        toast.error(`Помилка валідації: ${details}`);
        return;
      }

      toast.error(apiError?.message || error.message || "Bulk sync помилився");
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      queryClient.invalidateQueries({ queryKey: ["segs"] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      variables?.extraInvalidations?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: key });
      });
      toast.success("Структуру збережено");
    },
  });
}


