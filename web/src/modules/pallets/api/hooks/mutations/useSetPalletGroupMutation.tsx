import { setPalletGroup } from "@/modules/pallets/api/services/mutations/setPalletGroup";
import type { SetPalletGroupDto } from "@/modules/pallets/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSetPalletGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      palletId,
      data,
    }: {
      palletId: string;
      data: SetPalletGroupDto;
    }) => setPalletGroup(palletId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
      queryClient.invalidateQueries({ queryKey: ["pallet"] });
      queryClient.invalidateQueries({ queryKey: ["row"] });
      queryClient.invalidateQueries({ queryKey: ["rows"] });
      queryClient.invalidateQueries({ queryKey: ["pallet-groups"] });
    },
  });
}
