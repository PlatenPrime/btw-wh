import { useState, useEffect, useCallback } from "react";
import type { BlockDto, ZoneWithBlockDto } from "@/modules/blocks/api/types";
import { useUpdateBlockMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateBlockMutation";
import { useZonesInfiniteQuery } from "@/modules/blocks/api/hooks/queries/useZonesInfiniteQuery";
import { BlockContainerView } from "./BlockContainerView";
import { BlockContainerSkeleton } from "./BlockContainerSkeleton";

interface BlockContainerProps {
  block: BlockDto;
  isEditMode: boolean;
  onEditModeChange: (isEditMode: boolean) => void;
  onSaveReady?: (onSave: () => Promise<void>, onCancel: () => void) => void;
}

export function BlockContainer({
  block,
  isEditMode,
  onEditModeChange,
  onSaveReady,
}: BlockContainerProps) {
  const [zones, setZones] = useState<ZoneWithBlockDto[]>([]);
  const [originalZones, setOriginalZones] = useState<ZoneWithBlockDto[]>([]);
  const updateBlockMutation = useUpdateBlockMutation();

  // Получаем все зоны с infinite scroll и фильтруем по блоку
  const {
    data: zonesData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useZonesInfiniteQuery({
    limit: 100, // Максимальный лимит API
    search: "",
    enabled: true,
  });

  // Загружаем все страницы, если есть еще данные
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (zonesData?.pages) {
      // Собираем все зоны из всех страниц
      const allZones = zonesData.pages.flatMap((page) => page.data);
      
      // Фильтруем зоны, которые принадлежат этому блоку
      // Приводим к типу ZoneWithBlockDto, так как API может возвращать зоны с полями block и order
      const blockZones = allZones
        .filter((zone) => {
          const zoneWithBlock = zone as unknown as ZoneWithBlockDto;
          return zoneWithBlock.block?.id === block._id;
        })
        .map((zone) => {
          const zoneWithBlock = zone as unknown as ZoneWithBlockDto;
          return {
            ...zone,
            block: zoneWithBlock.block ? { id: zoneWithBlock.block.id, title: zoneWithBlock.block.title } : undefined,
            order: zoneWithBlock.order,
          } as ZoneWithBlockDto;
        })
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

      setZones(blockZones);
      setOriginalZones([...blockZones]);
    }
  }, [zonesData, block._id]);

  useEffect(() => {
    if (isEditMode) {
      setOriginalZones([...zones]);
    }
  }, [isEditMode]);

  const handleCancel = useCallback(() => {
    setZones([...originalZones]);
    onEditModeChange(false);
  }, [originalZones, onEditModeChange]);

  const handleSave = useCallback(async () => {
    try {
      // Обновляем блок с новым порядком зон
      await updateBlockMutation.mutateAsync({
        id: block._id,
        data: {
          zones: zones.map((zone, index) => ({
            zoneId: zone._id,
            order: index,
          })),
        },
      });

      onEditModeChange(false);
    } catch (error) {
      console.error("Помилка збереження порядку зон:", error);
      throw error;
    }
  }, [zones, block._id, updateBlockMutation, onEditModeChange]);

  // Передаем функции сохранения и отмены в родительский компонент
  useEffect(() => {
    if (onSaveReady) {
      onSaveReady(handleSave, handleCancel);
    }
  }, [handleSave, handleCancel, onSaveReady]);

  const handleDragEnd = (newZones: ZoneWithBlockDto[]) => {
    setZones(newZones);
  };

  if (isLoading) {
    return <BlockContainerSkeleton />;
  }

  return (
    <BlockContainerView
      block={block}
      zones={zones}
      isEditMode={isEditMode}
      onDragEnd={handleDragEnd}
    />
  );
}

