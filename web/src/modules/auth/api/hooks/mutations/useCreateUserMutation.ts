import { createUser } from "@/modules/auth/api/services/mutations/createUser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateUserMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Користувача створено");
    },
    onError: (error: Error) => {
      toast.error("Помилка створення користувача", {
        description: error.message,
      });
    },
  });
}
