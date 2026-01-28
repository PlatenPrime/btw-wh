import { setPalletsForGroup } from "@/modules/pallet-groups/api/services/mutations/setPalletsForGroup";
import type {
  PalletGroupResponseDto,
  SetPalletsForGroupDto,
} from "@/modules/pallet-groups/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
}

export function useSetPalletsForGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    PalletGroupResponseDto,
    AxiosError<ApiErrorResponse>,
    SetPalletsForGroupDto
  >({
    mutationFn: (data) => setPalletsForGroup({ data }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["pallet-groups"] });
      if (response.data.id) {
        queryClient.invalidateQueries({
          queryKey: ["pallet-groups", response.data.id],
        });
      }
      toast.success("Склад груп палет оновлено");
    },
    onError: (error) => {
      const errorData = error.response?.data;
      toast.error(
        errorData?.message ||
          error.message ||
          "Помилка оновлення складу групи палет",
      );
    },
  });
}
