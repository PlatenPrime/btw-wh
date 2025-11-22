import { useState, useEffect, useCallback } from "react";
import type { BlockDto, ZoneWithBlockDto } from "@/modules/blocks/api/types";
import { useUpdateBlockMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateBlockMutation";
import { useZonesByBlockIdQuery } from "@/modules/zones/api/hooks/queries/useZonesByBlockIdQuery";
import { BlockContainerView } from "./BlockContainerView";
import { BlockContainerSkeleton } from "./BlockContainerSkeleton";
import { RemoveZoneFromBlockDialog } from "@/modules/blocks/components/dialogs/remove-zone-from-block-dialog";
import { toast } from "sonner";

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
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [selectedZoneForRemove, setSelectedZoneForRemove] = useState<ZoneWithBlockDto | null>(null);
  const updateBlockMutation = useUpdateBlockMutation();

  // Получаем зоны конкретного блока через API
  const {
    data: zonesData,
    isLoading,
    isFetching,
  } = useZonesByBlockIdQuery({
    blockId: block._id,
    enabled: true,
  });

  useEffect(() => {
    if (zonesData?.data) {
      // API возвращает зоны с полями block и order
      // Приводим к типу ZoneWithBlockDto и сортируем по order
      const blockZones = zonesData.data
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
    } else if (zonesData && zonesData.data.length === 0) {
      // Если зон нет, устанавливаем пустой массив
      setZones([]);
      setOriginalZones([]);
    }
  }, [zonesData]);

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
      // Order должен быть 1-based (начинается с 1, а не с 0)
      const zonesToUpdate = zones.map((zone, index) => ({
        zoneId: zone._id,
        order: index + 1,
      }));

      // Optimistic update: обновляем локальное состояние зон с новым порядком
      const optimisticZones = zones.map((zone, index) => ({
        ...zone,
        order: index + 1,
      }));

      // Сохраняем предыдущее состояние для отката
      const previousZones = [...zones];

      // Применяем optimistic update локально
      setZones(optimisticZones);

      try {
        await updateBlockMutation.mutateAsync({
          id: block._id,
          data: {
            zones: zonesToUpdate,
          },
        });

        onEditModeChange(false);
        
        // Информируем пользователя о необходимости пересчета секторов
        if (zonesToUpdate.length > 0) {
          toast.info(
            "Порядок зон збережено. Сектора зон не перераховані автоматично. Використайте кнопку 'Перерахувати сектора' для оновлення.",
            { duration: 5000 }
          );
        }
      } catch (error) {
        // Откатываем optimistic update при ошибке
        setZones(previousZones);
        throw error;
      }
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

  const handleRemove = (zone: ZoneWithBlockDto) => {
    setSelectedZoneForRemove(zone);
    setRemoveDialogOpen(true);
  };

  const handleRemoveSuccess = () => {
    // После успешного удаления обновляем локальное состояние
    if (selectedZoneForRemove) {
      setZones((prev) => prev.filter((z) => z._id !== selectedZoneForRemove._id));
      setOriginalZones((prev) => prev.filter((z) => z._id !== selectedZoneForRemove._id));
    }
    setSelectedZoneForRemove(null);
  };

  if (isLoading) {
    return <BlockContainerSkeleton />;
  }

  return (
    <>
      <BlockContainerView
        block={block}
        zones={zones}
        isEditMode={isEditMode}
        isFetching={isFetching}
        onDragEnd={handleDragEnd}
        onRemove={isEditMode ? handleRemove : undefined}
      />
      {selectedZoneForRemove && (
        <RemoveZoneFromBlockDialog
          zone={selectedZoneForRemove}
          block={block}
          open={removeDialogOpen}
          onOpenChange={setRemoveDialogOpen}
          onSuccess={handleRemoveSuccess}
        />
      )}
    </>
  );
}

