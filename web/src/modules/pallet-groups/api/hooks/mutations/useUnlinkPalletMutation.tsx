import { unlinkPallet } from "@/modules/pallet-groups/api/services/mutations/unlinkPallet";
import type {
  PalletGroupResponseDto,
  UnlinkPalletDto,
} from "@/modules/pallet-groups/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
}

export function useUnlinkPalletMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    PalletGroupResponseDto,
    AxiosError<ApiErrorResponse>,
    UnlinkPalletDto
  >({
    mutationFn: (data) => unlinkPallet({ data }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["pallet-groups"] });
      if (response.data.id) {
        queryClient.invalidateQueries({
          queryKey: ["pallet-groups", response.data.id],
        });
      }
      toast.success("Палету відв'язано від групи");
    },
    onError: (error) => {
      const errorData = error.response?.data;
      toast.error(
        errorData?.message ||
          error.message ||
          "Помилка відв'язки палети від групи",
      );
    },
  });
}
