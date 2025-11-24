import { deleteSegment } from "@/modules/blocks/api/services/mutations/deleteSegment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
}

export function useDeleteSegmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSegment({ id }),
    onSuccess: (data) => {
      const segmentId = data.data._id;
      const blockId = data.data.block;
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
      toast.success("Сегмент успішно видалено");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorData = error.response?.data;
      const status = error.response?.status;

      if (status === 400) {
        toast.error("Неверний формат ID сегмента");
      } else if (status === 404) {
        toast.error(errorData?.message || "Сегмент не знайдено");
      } else {
        toast.error(errorData?.message || error.message || "Помилка видалення сегмента");
      }
    },
  });
}

