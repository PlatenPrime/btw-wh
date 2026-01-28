import { deletePalletGroup } from "@/modules/pallet-groups/api/services/mutations/deletePalletGroup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
}

export function useDeletePalletGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePalletGroup({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pallet-groups"] });
      toast.success("Групу палет видалено");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorData = error.response?.data;
      toast.error(
        errorData?.message || error.message || "Помилка видалення групи палет",
      );
    },
  });
}
