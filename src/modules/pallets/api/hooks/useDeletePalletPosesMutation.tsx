import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePalletPoses } from "../services/deletePalletPoses";

export function useDeletePalletPosesMutation(palletId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePalletPoses(palletId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({ queryKey: ["poses", { palletId }] });
    },
  });
}
