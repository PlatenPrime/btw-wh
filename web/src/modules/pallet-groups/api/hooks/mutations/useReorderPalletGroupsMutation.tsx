import { reorderPalletGroups } from "@/modules/pallet-groups/api/services/mutations/reorderPalletGroups";
import type { ReorderPalletGroupsDto } from "@/modules/pallet-groups/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
}

export function useReorderPalletGroupsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: ReorderPalletGroupsDto) =>
      reorderPalletGroups(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pallet-groups"] });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorData = error.response?.data;
      toast.error(
        errorData?.message ||
          error.message ||
          "Помилка збереження порядку груп палет",
      );
    },
  });
}
