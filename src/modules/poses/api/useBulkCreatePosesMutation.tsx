import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkCreatePoses } from "./index";

export function useBulkCreatePosesMutation(palletId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { poses: any[] }) => bulkCreatePoses(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({ queryKey: ["poses", { palletId }] });
    },
  });
}
