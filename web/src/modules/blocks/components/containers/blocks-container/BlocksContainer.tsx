import { useState, useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BlocksContainerView } from "@/modules/blocks/components/containers/blocks-container/BlocksContainerView";
import { BlocksControlPanel } from "@/modules/blocks/components/controls/blocks-control-panel/BlocksControlPanel";
import { CreateBlockDialog } from "@/modules/blocks/components/dialogs/create-block-dialog/CreateBlockDialog";
import { DeleteBlockDialog } from "@/modules/blocks/components/dialogs/delete-block-dialog/DeleteBlockDialog";
import { useUpdateBlockMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateBlockMutation";
import type { BlockDto, BlocksResponseDto } from "@/modules/blocks/api/types";

interface BlocksContainerProps {
  data: BlockDto[];
}

export function BlocksContainer({ data }: BlocksContainerProps) {
  const [blocks, setBlocks] = useState<BlockDto[]>(data);
  const [originalBlocks, setOriginalBlocks] = useState<BlockDto[]>(data);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deleteDialogBlock, setDeleteDialogBlock] = useState<BlockDto | null>(null);
  const updateBlockMutation = useUpdateBlockMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    setBlocks(data);
    setOriginalBlocks(data);
  }, [data]);

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
      const updates = blocks
        .map((block, index) => {
          const originalIndex = originalBlocks.findIndex((b) => b._id === block._id);
          if (originalIndex !== index) {
            return { id: block._id, order: index + 1 };
          }
          return null;
        })
        .filter(Boolean) as Array<{ id: string; order: number }>;

      if (updates.length === 0) {
        setIsEditMode(false);
        return;
      }

      const previousData = queryClient.getQueryData<BlocksResponseDto>(["blocks"]);
      if (previousData) {
        const optimisticBlocks = blocks.map((block, index) => ({
          ...block,
          order: index + 1,
        }));
        queryClient.setQueryData<BlocksResponseDto>(["blocks"], {
          ...previousData,
          data: optimisticBlocks,
        });
      }

      try {
        await Promise.all(
          updates.map((update) =>
            updateBlockMutation.mutateAsync({
              id: update.id,
              data: { order: update.order },
            })
          )
        );

        setIsEditMode(false);

        if (updates.length > 0) {
          toast.info(
            "Порядок блоків збережено. Сектора зон не перераховані автоматично. Використайте кнопку 'Перерахувати сектора' для оновлення.",
            { duration: 5000 }
          );
        }
      } catch (error) {
        if (previousData) {
          queryClient.setQueryData<BlocksResponseDto>(["blocks"], previousData);
        }
        throw error;
      }
    } catch (error) {
      console.error("Помилка збереження порядку блоків:", error);
    } finally {
      setIsSaving(false);
    }
  }, [blocks, originalBlocks, queryClient, updateBlockMutation]);

  const handleDragEnd = (newBlocks: BlockDto[]) => {
    setBlocks(newBlocks);
  };

  const handleDeleteRequest = (block: BlockDto) => {
    setDeleteDialogBlock(block);
  };

  return (
    <div className="grid gap-2 p-2">
      <BlocksControlPanel
        isEditMode={isEditMode}
        onCreate={() => setIsCreateDialogOpen(true)}
        onEdit={handleEnterEditMode}
        onCancel={handleCancel}
        onSave={handleSave}
        isSaving={isSaving}
      />

      <BlocksContainerView
        blocks={blocks}
        isEditMode={isEditMode}
        onDragEnd={handleDragEnd}
        onDelete={handleDeleteRequest}
      />

      <CreateBlockDialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen} />

      {deleteDialogBlock && (
        <DeleteBlockDialog
          block={deleteDialogBlock}
          open={Boolean(deleteDialogBlock)}
          onOpenChange={(open) => {
            if (!open) {
              setDeleteDialogBlock(null);
            }
          }}
        />
      )}
    </div>
  );
}

