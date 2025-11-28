import { useBulkStructureMutation } from "@/modules/blocks/api/hooks/mutations/useBulkStructureMutation";
import type {
  BlockDto,
  BlocksResponseDto,
  BulkUpsertBlockPayload,
} from "@/modules/blocks/api/types";
import type { QueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const buildBlockPayload = (
  blocks: BlockDto[],
  originalBlocks: BlockDto[],
): BulkUpsertBlockPayload[] => {
  return blocks.reduce<BulkUpsertBlockPayload[]>((acc, block, index) => {
    const original = originalBlocks.find((item) => item._id === block._id);
    const nextOrder = index + 1;
    if (!original || original.order !== nextOrder) {
      acc.push({
        _id: block._id,
        title: block.title,
        order: nextOrder,
      });
    }

    return acc;
  }, []);
};

interface UseBlocksContainerProps {
  initialData: BlockDto[];
}

interface UseBlocksContainerReturn {
  blocks: BlockDto[];
  isEditMode: boolean;
  isSaving: boolean;
  isCreateDialogOpen: boolean;
  deleteDialogBlock: BlockDto | null;
  handleEnterEditMode: () => void;
  handleCancel: () => void;
  handleSave: () => Promise<void>;
  handleDragEnd: (newBlocks: BlockDto[]) => void;
  handleDeleteRequest: (block: BlockDto) => void;
  setIsCreateDialogOpen: (open: boolean) => void;
  setDeleteDialogBlock: (block: BlockDto | null) => void;
}

export function useBlocksContainer({
  initialData,
}: UseBlocksContainerProps): UseBlocksContainerReturn {
  const [blocks, setBlocks] = useState<BlockDto[]>(initialData);
  const [originalBlocks, setOriginalBlocks] = useState<BlockDto[]>(initialData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deleteDialogBlock, setDeleteDialogBlock] = useState<BlockDto | null>(
    null,
  );
  const bulkMutation = useBulkStructureMutation();

  useEffect(() => {
    setBlocks(initialData);
    setOriginalBlocks(initialData);
  }, [initialData]);

  const handleEnterEditMode = () => {
    setOriginalBlocks([...blocks]);
    setIsEditMode(true);
  };

  const handleCancel = useCallback(() => {
    setBlocks([...originalBlocks]);
    setIsEditMode(false);
  }, [originalBlocks]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const payload = buildBlockPayload(blocks, originalBlocks);

      if (payload.length === 0) {
        setIsEditMode(false);
        return;
      }

      const optimisticUpdater = (client: QueryClient) => {
        const previousData = client.getQueryData<BlocksResponseDto>(["blocks"]);
        if (!previousData) {
          return undefined;
        }
        const optimisticBlocks = blocks.map((block, index) => ({
          ...block,
          order: index + 1,
        }));
        client.setQueryData<BlocksResponseDto>(["blocks"], {
          ...previousData,
          data: optimisticBlocks,
        });

        return () => {
          client.setQueryData<BlocksResponseDto>(["blocks"], previousData);
        };
      };

      await bulkMutation.mutateAsync({
        scope: "blocks",
        blocksPayload: payload,
        optimisticUpdater,
        extraInvalidations: payload.reduce<unknown[][]>((acc, item) => {
          if (item._id) {
            acc.push(["blocks", item._id]);
          }
          return acc;
        }, []),
      });

      setIsEditMode(false);

      toast.info(
        "Порядок блоків збережено. Сектора зон не перераховані автоматично. Використайте кнопку 'Перерахувати сектора' для оновлення.",
        { duration: 5000 },
      );
    } catch (error) {
      console.error("Помилка збереження порядку блоків:", error);
    } finally {
      setIsSaving(false);
    }
  }, [blocks, bulkMutation, originalBlocks]);

  const handleDragEnd = (newBlocks: BlockDto[]) => {
    setBlocks(newBlocks);
  };

  const handleDeleteRequest = (block: BlockDto) => {
    setDeleteDialogBlock(block);
  };

  return {
    blocks,
    isEditMode,
    isSaving,
    isCreateDialogOpen,
    deleteDialogBlock,
    handleEnterEditMode,
    handleCancel,
    handleSave,
    handleDragEnd,
    handleDeleteRequest,
    setIsCreateDialogOpen,
    setDeleteDialogBlock,
  };
}

