import type { IPallet } from "@/modules/pallets/api/types";
import { createPos } from "@/modules/poses/api/services/mutations/createPos";
import type { CreatePosDto } from "@/modules/poses/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreatePosMutation(pallet: IPallet) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePosDto) => createPos(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({
        queryKey: ["poses", { by: "pallet", palletId: pallet._id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["pallet", { palletId: pallet._id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["row", { rowId: pallet.row }],
      });
    },
  });
}

