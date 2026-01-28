import { resetPalletsSectors } from "@/modules/pallet-groups/api/services/mutations/resetPalletsSectors";
import type { ResetPalletsSectorsResponseDto } from "@/modules/pallet-groups/api/types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
}

export function useResetPalletsSectorsMutation() {
  return useMutation<
    ResetPalletsSectorsResponseDto,
    AxiosError<ApiErrorResponse>,
    void
  >({
    mutationFn: () => resetPalletsSectors({}),
    onSuccess: (response) => {
      toast.success(
        `Сектора палет скинуто. Знайдено: ${response.data.matchedCount}, змінено: ${response.data.modifiedCount}`,
      );
    },
    onError: (error) => {
      const errorData = error.response?.data;
      toast.error(
        errorData?.message ||
          error.message ||
          "Помилка скидання секторів палет",
      );
    },
  });
}
