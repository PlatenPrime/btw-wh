import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRow } from "@/modules/rows/api/services/mutations/updateRow";
import type { RowDto, UpdateRowDto } from "@/modules/rows/api/types/dto";

export function useUpdateRowMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rowId, data }: { rowId: string; data: UpdateRowDto }) =>
      updateRow(rowId, data),
    onSuccess: (updatedRow, variables) => {
      queryClient.invalidateQueries({ queryKey: ["rows"] });
      queryClient.invalidateQueries({ queryKey: ["row"] });
      queryClient.invalidateQueries({ queryKey: ["pallets"] });

      queryClient.setQueryData(["rows"], (oldData: RowDto[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map((row) =>
          row._id === updatedRow._id ? updatedRow : row,
        );
      });

      queryClient.setQueryData(["row", { rowId: updatedRow._id }], {
        data: updatedRow,
      });
    },
  });
}

