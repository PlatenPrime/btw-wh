import {
  patchArtById,
  type PatchArtRequest,
} from "@/modules/arts/api/services/mutations/patchArtById";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UsePatchArtMutationProps {
  artikul: string;
}

export function usePatchArtMutation({ artikul }: UsePatchArtMutationProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: PatchArtRequest }) =>
      patchArtById(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["art", { artikul }],
      });
      queryClient.invalidateQueries({ queryKey: ["arts"] });
    },
  });
}
