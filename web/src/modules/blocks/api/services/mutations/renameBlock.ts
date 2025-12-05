import { apiClient } from "@/lib/apiClient";
import { type BlockResponse } from "../../types";

interface RenameBlockParams {
    id: string;
    title: string;
    signal?: AbortSignal;
}

export const renameBlock = async ({
    id,
    title,
    signal,
}: RenameBlockParams): Promise<BlockResponse> => {
    const { data } = await apiClient.patch<BlockResponse>(
        `/blocks/${id}/rename`,
        { title },
        { signal }
    );
    return data;
};
