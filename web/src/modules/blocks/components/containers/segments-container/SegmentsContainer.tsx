import { useState, useEffect, useCallback } from "react";
import type {
  BulkUpsertSegmentPayload,
  SegmentDto,
  SegmentsResponseDto,
} from "@/modules/blocks/api/types";
import { useBulkStructureMutation } from "@/modules/blocks/api/hooks/mutations/useBulkStructureMutation";
import { SegmentsContainerView } from "./SegmentsContainerView";
import { useQueryClient, type QueryClient } from "@tanstack/react-query";
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
  const bulkMutation = useBulkStructureMutation();
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
      const payload = segments.reduce<BulkUpsertSegmentPayload[]>((acc, segment, index) => {
        const original = originalSegments.find((item) => item._id === segment._id);
        const nextOrder = index + 1;
        if (!original || original.order !== nextOrder) {
          acc.push({
            _id: segment._id,
            blockId,
            order: nextOrder,
            zones: segment.zones,
          });
        }
        return acc;
      }, []);

      if (payload.length === 0) {
        // Нет изменений, просто выходим из режима редактирования
        onEditModeChange(false);
        return;
      }

      const optimisticUpdater = (client: QueryClient) => {
        const queryKey = ["segs", "block", blockId] as const;
        const previousData = client.getQueryData<SegmentsResponseDto>(queryKey);
        if (!previousData) {
          return undefined;
        }
        const optimisticSegments = segments.map((segment, index) => ({
          ...segment,
          order: index + 1,
        }));
        client.setQueryData<SegmentsResponseDto>(queryKey, {
          ...previousData,
          data: optimisticSegments,
        });

        return () => {
          client.setQueryData<SegmentsResponseDto>(queryKey, previousData);
        };
      };

      await bulkMutation.mutateAsync({
        scope: "segs",
        segsPayload: payload,
        optimisticUpdater,
        extraInvalidations: [
          ["segs", "block", blockId],
          ...payload.reduce<unknown[][]>((acc, item) => {
            if (item._id) {
              acc.push(["segs", item._id], ["zones", "seg", item._id]);
            }
            return acc;
          }, []),
        ],
      });

      onEditModeChange(false);
      
      // Информируем пользователя о необходимости пересчета секторов
      toast.info(
        "Порядок сегментів збережено. Сектора зон не перераховані автоматично. Використайте кнопку 'Перерахувати сектора' для оновлення.",
        { duration: 5000 }
      );
    } catch (error) {
      console.error("Помилка збереження порядку сегментів:", error);
      throw error;
    }
  }, [segments, originalSegments, bulkMutation, onEditModeChange, queryClient, blockId]);

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

