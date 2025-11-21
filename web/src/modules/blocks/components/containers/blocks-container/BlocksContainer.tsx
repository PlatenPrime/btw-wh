import { useState, useEffect, useCallback } from "react";
import type { BlockDto } from "@/modules/blocks/api/types";
import { useUpdateBlockMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateBlockMutation";
import { BlocksContainerView } from "./BlocksContainerView";

interface BlocksContainerProps {
  data: BlockDto[];
  isEditMode: boolean;
  onEditModeChange: (isEditMode: boolean) => void;
  onSaveReady?: (onSave: () => Promise<void>, onCancel: () => void) => void;
  onDelete?: (block: BlockDto) => void;
}

export function BlocksContainer({
  data,
  isEditMode,
  onEditModeChange,
  onSaveReady,
  onDelete,
}: BlocksContainerProps) {
  const [blocks, setBlocks] = useState<BlockDto[]>(data);
  const [originalBlocks, setOriginalBlocks] = useState<BlockDto[]>(data);
  const updateBlockMutation = useUpdateBlockMutation();

  useEffect(() => {
    setBlocks(data);
    setOriginalBlocks(data);
  }, [data]);

  useEffect(() => {
    if (isEditMode) {
      setOriginalBlocks([...blocks]);
    }
  }, [isEditMode]);

  const handleCancel = useCallback(() => {
    setBlocks([...originalBlocks]);
    onEditModeChange(false);
  }, [originalBlocks, onEditModeChange]);

  const handleSave = useCallback(async () => {
    try {
      // Обновляем порядок всех блоков, которые изменились
      const updates = blocks.map((block, index) => {
        const originalIndex = originalBlocks.findIndex((b) => b._id === block._id);
        if (originalIndex !== index) {
          return { id: block._id, order: index };
        }
        return null;
      }).filter(Boolean) as Array<{ id: string; order: number }>;

      if (updates.length === 0) {
        // Нет изменений, просто выходим из режима редактирования
        onEditModeChange(false);
        return;
      }

      // Выполняем обновления параллельно
      await Promise.all(
        updates.map((update) =>
          updateBlockMutation.mutateAsync({
            id: update.id,
            data: { order: update.order },
          })
        )
      );

      onEditModeChange(false);
    } catch (error) {
      console.error("Помилка збереження порядку блоків:", error);
      throw error;
    }
  }, [blocks, originalBlocks, updateBlockMutation, onEditModeChange]);

  // Передаем функции сохранения и отмены в родительский компонент
  useEffect(() => {
    if (onSaveReady) {
      onSaveReady(handleSave, handleCancel);
    }
  }, [handleSave, handleCancel, onSaveReady]);

  const handleDragEnd = (newBlocks: BlockDto[]) => {
    setBlocks(newBlocks);
  };

  return (
    <BlocksContainerView
      blocks={blocks}
      isEditMode={isEditMode}
      onDragEnd={handleDragEnd}
      onDelete={onDelete}
    />
  );
}

