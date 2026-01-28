import { createPalletGroup } from "@/modules/pallet-groups/api/services/mutations/createPalletGroup";
import type { CreatePalletGroupDto } from "@/modules/pallet-groups/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";

interface ApiErrorResponse {
  message: string;
  errors?: Array<{
    path: string[];
    message: string;
  }>;
  duplicateFields?: string[];
}

export function useCreatePalletGroupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePalletGroupDto) => createPalletGroup({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pallet-groups"] });
      toast.success("Групу палет успішно створено");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      const errorData = error.response?.data;
      const status = error.response?.status;

      if (status === 400) {
        if (errorData?.errors && errorData.errors.length > 0) {
          const validationMessages = errorData.errors
            .map((err) => `${err.path.join(".")}: ${err.message}`)
            .join(", ");
          toast.error(`Помилка валідації: ${validationMessages}`);
        } else {
          toast.error(errorData?.message || "Помилка валідації даних");
        }
      } else if (status === 409) {
        if (errorData?.duplicateFields?.includes("title")) {
          toast.error("Група з такою назвою вже існує");
        } else {
          toast.error(errorData?.message || "Конфлікт даних");
        }
      } else {
        toast.error(
          errorData?.message ||
            error.message ||
            "Помилка створення групи палет",
        );
      }
    },
  });
}
