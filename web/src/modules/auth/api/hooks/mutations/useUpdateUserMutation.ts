import type { AdminUpdateUserData } from "@/modules/auth/api/types";
import { updateUserAdmin } from "@/modules/auth/api/services/mutations/updateUserAdmin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface UpdateUserMutationParams {
  userId: string;
  data: AdminUpdateUserData;
}

export function useUpdateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, data }: UpdateUserMutationParams) =>
      updateUserAdmin(userId, data),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", userId] });
      toast.success("Користувача оновлено");
    },
    onError: (error: Error) => {
      toast.error("Помилка оновлення користувача", {
        description: error.message,
      });
    },
  });
}
