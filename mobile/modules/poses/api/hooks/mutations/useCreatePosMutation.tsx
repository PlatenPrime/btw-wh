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
        queryKey: ["pallet", { id: pallet._id }],
      });
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
      queryClient.invalidateQueries({
        queryKey: ["pallets", { by: "row", rowId: pallet.row }],
      });
      queryClient.invalidateQueries({
        queryKey: ["row", { rowId: pallet.row }],
      });
      if (pallet.rowData?.title) {
        queryClient.invalidateQueries({
          queryKey: ["row", { rowTitle: pallet.rowData.title }],
        });
      }
    },
    onError: () => {
    },
  });
}

