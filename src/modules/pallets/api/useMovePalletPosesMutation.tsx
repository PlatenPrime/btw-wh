import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movePalletPoses } from "./index";

export function useMovePalletPosesMutation(
  fromPalletId: string,
  toPalletId: string,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (positionIds: string[]) =>
      movePalletPoses(fromPalletId, toPalletId, positionIds),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["poses", { palletId: fromPalletId }],
      });
      queryClient.invalidateQueries({
        queryKey: ["poses", { palletId: toPalletId }],
      });
    },
  });
}
