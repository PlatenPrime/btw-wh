import { useMutation, useQueryClient } from "@tanstack/react-query";
import { movePalletPoses } from "@/modules/pallets/api/services/mutations/movePalletPoses";
import type { IPallet } from "@/modules/pallets/api/types";

interface UseMovePalletPosesMutationArgs {
  pallet: IPallet;
}

export function useMovePalletPosesMutation({
  pallet,
}: UseMovePalletPosesMutationArgs) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (targetPalletId: string) =>
      movePalletPoses(pallet._id, targetPalletId),
    onSuccess: (data) => {
      // Инвалидируем source pallet
      queryClient.invalidateQueries({ queryKey: ["poses"] });
      queryClient.invalidateQueries({
        queryKey: ["poses", { by: "pallet", palletId: pallet._id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["pallet", { id: pallet._id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["pallet", { palletId: pallet._id }],
      });
      queryClient.invalidateQueries({ queryKey: ["pallets"] });
      queryClient.invalidateQueries({
        queryKey: ["pallets", { by: "row", rowId: pallet.row }],
      });
      queryClient.invalidateQueries({
        queryKey: ["row", { rowId: pallet.row }],
      });

      // Инвалидируем target pallet и его row, если данные доступны
      if (data.targetPallet) {
        queryClient.invalidateQueries({
          queryKey: ["poses", { by: "pallet", palletId: data.targetPallet._id }],
        });
        queryClient.invalidateQueries({
          queryKey: ["pallet", { id: data.targetPallet._id }],
        });
        queryClient.invalidateQueries({
          queryKey: ["pallet", { palletId: data.targetPallet._id }],
        });
        queryClient.invalidateQueries({
          queryKey: ["pallets", { by: "row", rowId: data.targetPallet.row }],
        });
        if (data.targetPallet.rowData) {
          queryClient.invalidateQueries({
            queryKey: ["row", { rowId: data.targetPallet.rowData._id }],
          });
        }
      }
    },
    onError: () => {
    },
  });
}

