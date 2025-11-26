import { useBulkStructureMutation } from "@/modules/blocks/api/hooks/mutations/useBulkStructureMutation";
import type {
  BlockDto,
  BlocksResponseDto,
  BulkUpsertBlockPayload,
} from "@/modules/blocks/api/types";
import { BlocksContainerView } from "@/modules/blocks/components/containers/blocks-container/BlocksContainerView";
import { BlocksControlPanel } from "@/modules/blocks/components/controls/blocks-control-panel/BlocksControlPanel";
import { CreateBlockDialog } from "@/modules/blocks/components/dialogs/create-block-dialog/CreateBlockDialog";
import { DeleteBlockDialog } from "@/modules/blocks/components/dialogs/delete-block-dialog/DeleteBlockDialog";
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

interface BlocksContainerProps {
  data: BlockDto[];
}

export function BlocksContainer({ data }: BlocksContainerProps) {
  const [blocks, setBlocks] = useState<BlockDto[]>(data);
  const [originalBlocks, setOriginalBlocks] = useState<BlockDto[]>(data);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deleteDialogBlock, setDeleteDialogBlock] = useState<BlockDto | null>(
    null,
  );
  const bulkMutation = useBulkStructureMutation();

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

      <CreateBlockDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />

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
