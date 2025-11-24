import { useState, useEffect, useCallback } from "react";
import type { SegmentDto, SegmentsResponseDto } from "@/modules/blocks/api/types";
import { useUpdateSegmentMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateSegmentMutation";
import { SegmentsContainerView } from "./SegmentsContainerView";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface SegmentsContainerProps {
  data: SegmentDto[];
  blockId: string;
  isEditMode: boolean;
  onEditModeChange: (isEditMode: boolean) => void;
  onSaveReady?: (onSave: () => Promise<void>, onCancel: () => void) => void;
  onDelete?: (segment: SegmentDto) => void;
}

export function SegmentsContainer({
  data,
  blockId,
  isEditMode,
  onEditModeChange,
  onSaveReady,
  onDelete,
}: SegmentsContainerProps) {
  const [segments, setSegments] = useState<SegmentDto[]>(data);
  const [originalSegments, setOriginalSegments] = useState<SegmentDto[]>(data);
  const updateSegmentMutation = useUpdateSegmentMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    setSegments(data);
    setOriginalSegments(data);
  }, [data]);

  useEffect(() => {
    if (isEditMode) {
      setOriginalSegments([...segments]);
    }
  }, [isEditMode]);

  const handleCancel = useCallback(() => {
    setSegments([...originalSegments]);
    onEditModeChange(false);
  }, [originalSegments, onEditModeChange]);

  const handleSave = useCallback(async () => {
    try {
      // Обновляем порядок всех сегментов, которые изменились
      // Order должен быть 1-based (начинается с 1, а не с 0)
      const updates = segments.map((segment, index) => {
        const originalIndex = originalSegments.findIndex((s) => s._id === segment._id);
        if (originalIndex !== index) {
          return { id: segment._id, order: index + 1 };
        }
        return null;
      }).filter(Boolean) as Array<{ id: string; order: number }>;

      if (updates.length === 0) {
        // Нет изменений, просто выходим из режима редактирования
        onEditModeChange(false);
        return;
      }

      // Optimistic update: обновляем кеш до получения ответа от сервера
      const previousData = queryClient.getQueryData<SegmentsResponseDto>(["segs", "block", blockId]);
      if (previousData) {
        const optimisticSegments = segments.map((segment, index) => ({
          ...segment,
          order: index + 1,
        }));
        queryClient.setQueryData<SegmentsResponseDto>(["segs", "block", blockId], {
          ...previousData,
          data: optimisticSegments,
        });
      }

      try {
        // Выполняем обновления параллельно
        await Promise.all(
          updates.map((update) =>
            updateSegmentMutation.mutateAsync({
              id: update.id,
              data: { order: update.order },
            })
          )
        );

        onEditModeChange(false);
        
        // Информируем пользователя о необходимости пересчета секторов
        if (updates.length > 0) {
          toast.info(
            "Порядок сегментів збережено. Сектора зон не перераховані автоматично. Використайте кнопку 'Перерахувати сектора' для оновлення.",
            { duration: 5000 }
          );
        }
      } catch (error) {
        // Откатываем optimistic update при ошибке
        if (previousData) {
          queryClient.setQueryData<SegmentsResponseDto>(["segs", "block", blockId], previousData);
        }
        throw error;
      }
    } catch (error) {
      console.error("Помилка збереження порядку сегментів:", error);
      throw error;
    }
  }, [segments, originalSegments, updateSegmentMutation, onEditModeChange, queryClient, blockId]);

  // Передаем функции сохранения и отмены в родительский компонент
  useEffect(() => {
    if (onSaveReady) {
      onSaveReady(handleSave, handleCancel);
    }
  }, [handleSave, handleCancel, onSaveReady]);

  const handleDragEnd = (newSegments: SegmentDto[]) => {
    setSegments(newSegments);
  };

  return (
    <SegmentsContainerView
      segments={segments}
      blockId={blockId}
      isEditMode={isEditMode}
      onDragEnd={handleDragEnd}
      onDelete={onDelete}
    />
  );
}

