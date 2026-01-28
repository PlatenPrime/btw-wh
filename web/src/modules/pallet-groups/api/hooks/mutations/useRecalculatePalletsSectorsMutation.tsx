import { recalculatePalletsSectors } from "@/modules/pallet-groups/api/services/mutations/recalculatePalletsSectors";
import type { RecalculatePalletsSectorsResponseDto } from "@/modules/pallet-groups/api/types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
}

export function useRecalculatePalletsSectorsMutation() {
  return useMutation<
    RecalculatePalletsSectorsResponseDto,
    AxiosError<ApiErrorResponse>,
    void
  >({
    mutationFn: () => recalculatePalletsSectors({}),
    onSuccess: (response) => {
      toast.success(
        `Сектора палет перераховано. Оновлено палет: ${response.data.updatedPallets}, груп: ${response.data.groupsProcessed}`,
      );
    },
    onError: (error) => {
      const errorData = error.response?.data;
      toast.error(
        errorData?.message ||
          error.message ||
          "Помилка перерахунку секторів палет",
      );
    },
  });
}
