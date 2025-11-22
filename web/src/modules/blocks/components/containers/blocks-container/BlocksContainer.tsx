import { useState, useEffect, useCallback } from "react";
import type { BlockDto, BlocksResponseDto } from "@/modules/blocks/api/types";
import { useUpdateBlockMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateBlockMutation";
import { BlocksContainerView } from "./BlocksContainerView";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
  const queryClient = useQueryClient();

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
      // Order должен быть 1-based (начинается с 1, а не с 0)
      const updates = blocks.map((block, index) => {
        const originalIndex = originalBlocks.findIndex((b) => b._id === block._id);
        if (originalIndex !== index) {
          return { id: block._id, order: index + 1 };
        }
        return null;
      }).filter(Boolean) as Array<{ id: string; order: number }>;

      if (updates.length === 0) {
        // Нет изменений, просто выходим из режима редактирования
        onEditModeChange(false);
        return;
      }

      // Optimistic update: обновляем кеш до получения ответа от сервера
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
        
        // Информируем пользователя о необходимости пересчета секторов
        if (updates.length > 0) {
          toast.info(
            "Порядок блоків збережено. Сектора зон не перераховані автоматично. Використайте кнопку 'Перерахувати сектора' для оновлення.",
            { duration: 5000 }
          );
        }
      } catch (error) {
        // Откатываем optimistic update при ошибке
        if (previousData) {
          queryClient.setQueryData<BlocksResponseDto>(["blocks"], previousData);
        }
        throw error;
      }
    } catch (error) {
      console.error("Помилка збереження порядку блоків:", error);
      throw error;
    }
  }, [blocks, originalBlocks, updateBlockMutation, onEditModeChange, queryClient]);

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

