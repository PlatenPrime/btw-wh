import { updatePalletGroup } from "@/modules/pallet-groups/api/services/mutations/updatePalletGroup";
import type { UpdatePalletGroupDto } from "@/modules/pallet-groups/api/types";
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

export function useUpdatePalletGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePalletGroupDto }) =>
      updatePalletGroup({ id, data }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["pallet-groups"] });
      queryClient.invalidateQueries({
        queryKey: ["pallet-groups", variables.id],
      });
      toast.success("Групу палет оновлено");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorData = error.response?.data;
      toast.error(
        errorData?.message || error.message || "Помилка оновлення групи палет",
      );
    },
  });
}
