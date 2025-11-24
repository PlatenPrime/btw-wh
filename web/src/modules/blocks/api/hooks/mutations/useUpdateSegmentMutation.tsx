import { updateSegment } from "@/modules/blocks/api/services/mutations/updateSegment";
import type { UpdateSegmentDto } from "@/modules/blocks/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
  duplicateFields?: string[];
}

export function useUpdateSegmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSegmentDto }) =>
      updateSegment({ id, data }),
    onSuccess: (data) => {
      const segmentId = data.data?._id;
      const blockId = data.data?.block;
      if (blockId) {
        queryClient.invalidateQueries({ queryKey: ["segs", "block", blockId] });
      }
      if (segmentId) {
        queryClient.invalidateQueries({ queryKey: ["segs", segmentId] });
        queryClient.invalidateQueries({ queryKey: ["zones", "seg", segmentId] });
      }
      queryClient.invalidateQueries({ queryKey: ["segs"] });
      queryClient.invalidateQueries({ queryKey: ["zones"] });
      queryClient.invalidateQueries({ queryKey: ["blocks"] });
      toast.success("Сегмент успішно оновлено");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorData = error.response?.data;
      const status = error.response?.status;

      if (status === 400) {
        if (errorData?.errors && errorData.errors.length > 0) {
          const validationMessages = errorData.errors
            .map((err) => `${err.path.join(".")}: ${err.message}`)
            .join(", ");
          toast.error(`Помилка валідації: ${validationMessages}`);
        } else {
          toast.error(errorData?.message || "Помилка валідації даних");
        }
      } else if (status === 404) {
        toast.error(errorData?.message || "Сегмент або зони не знайдено");
      } else {
        toast.error(errorData?.message || error.message || "Помилка оновлення сегмента");
      }
    },
  });
}

