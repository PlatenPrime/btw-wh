import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRow } from "@/modules/rows/api/services/mutations/updateRow";
import type { RowDto, UpdateRowDto } from "@/modules/rows/api/types/dto";

export function useUpdateRowMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rowId, data }: { rowId: string; data: UpdateRowDto }) => {
      console.log("Updating row:", { rowId, data });
      return updateRow(rowId, data);
    },
    onMutate: async ({ rowId, data }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["rows"] });
      await queryClient.cancelQueries({ queryKey: ["row"] });

      // Snapshot the previous value
      const previousRows = queryClient.getQueryData<RowDto[]>(["rows"]);
      const previousRow = queryClient.getQueryData<RowDto>(["row", { rowId }]);

      // Optimistically update to the new value
      if (previousRows) {
        queryClient.setQueryData<RowDto[]>(["rows"], (old) => {
          if (!old) return old;
          return old.map((row) =>
            row._id === rowId
              ? { ...row, ...data, updatedAt: new Date().toISOString() }
              : row,
          );
        });
      }

      if (previousRow) {
        queryClient.setQueryData<RowDto>(["row", { rowId }], (old) => {
          if (!old) return old;
          return { ...old, ...data, updatedAt: new Date().toISOString() };
        });
      }

      // Return a context object with the snapshotted value
      return { previousRows, previousRow };
    },
    onSuccess: (updatedRow) => {
      console.log("Row updated successfully:", updatedRow);
      // Invalidate all row-related queries to ensure UI updates
      queryClient.invalidateQueries({ queryKey: ["rows"] });
      queryClient.invalidateQueries({ queryKey: ["row"] });

      // Also try to update the cache directly for immediate UI feedback
      queryClient.setQueryData(["rows"], (oldData: RowDto[] | undefined) => {
        if (!oldData) return oldData;
        return oldData.map((row) =>
          row._id === updatedRow._id ? updatedRow : row,
        );
      });

      queryClient.setQueryData(["row", { rowId: updatedRow._id }], updatedRow);
      queryClient.setQueryData(
        ["row", { rowTitle: updatedRow.title }],
        updatedRow,
      );
    },
    onError: (error, variables, context) => {
      console.error("Failed to update row:", error);
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousRows) {
        queryClient.setQueryData(["rows"], context.previousRows);
      }
      if (context?.previousRow) {
        queryClient.setQueryData(
          ["row", { rowId: variables.rowId }],
          context.previousRow,
        );
      }
    },
  });
}
