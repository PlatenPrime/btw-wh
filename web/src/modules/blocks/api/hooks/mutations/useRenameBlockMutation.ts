import { useMutation, useQueryClient } from "@tanstack/react-query";
import { renameBlock } from "../../services/mutations/renameBlock";
import { type BlockResponse } from "../../types";

export const useRenameBlockMutation = () => {
    const queryClient = useQueryClient();

    return useMutation<BlockResponse, Error, { id: string; title: string }>({
        mutationFn: renameBlock,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["blocks"] });
            queryClient.invalidateQueries({ queryKey: ["segs"] });
            // Инвалидируем zones, так как изменение блока может повлиять на секторы зон
            queryClient.invalidateQueries({ queryKey: ["zones"] });
        },
    });
};
