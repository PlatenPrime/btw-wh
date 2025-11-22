import { useState } from "react";
import { useUpdateBlockMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateBlockMutation";
import { useZonesInfiniteQuery } from "@/modules/blocks/api/hooks/queries/useZonesInfiniteQuery";
import { useZonesByBlockIdQuery } from "@/modules/zones/api/hooks/queries/useZonesByBlockIdQuery";
import type { ZoneWithBlockDto } from "@/modules/blocks/api/types";
import { AddZonesFormView } from "./AddZonesFormView";

interface AddZonesFormProps {
  blockId: string;
  enabled?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddZonesForm({
  blockId,
  enabled = true,
  onSuccess,
  onCancel,
}: AddZonesFormProps) {
  const [search, setSearch] = useState("");
  const [selectedZoneIds, setSelectedZoneIds] = useState<Set<string>>(new Set());
  const updateBlockMutation = useUpdateBlockMutation();

  // Получаем текущие зоны блока через API (только когда диалог открыт)
  const { data: zonesDataForBlock } = useZonesByBlockIdQuery({
    blockId,
    enabled: enabled,
  });

  const currentZones = (zonesDataForBlock?.data ?? []) as ZoneWithBlockDto[];

  // Получаем все зоны с infinite scroll для поиска (только когда диалог открыт)
  const {
    data: zonesData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useZonesInfiniteQuery({
    limit: 20,
    search,
    enabled: enabled,
  });

  // Собираем все зоны из всех страниц
  const allZones =
    zonesData?.pages.flatMap((page) => page.data) ?? [];

  // Фильтруем только свободные зоны (без блока) и исключаем зоны, которые уже в этом блоке
  const availableZones = allZones.filter((zone) => {
    const zoneWithBlock = zone as unknown as ZoneWithBlockDto;
    // Показываем только зоны без блока (!zone.block)
    return !zoneWithBlock.block;
  });

  const handleToggleZone = (zoneId: string) => {
    setSelectedZoneIds((prev) => {
      const next = new Set(prev);
      if (next.has(zoneId)) {
        next.delete(zoneId);
      } else {
        next.add(zoneId);
      }
      return next;
    });
  };

  const handleSubmit = async () => {
    if (selectedZoneIds.size === 0) {
      return;
    }

    try {
      // Добавляем выбранные зоны к текущим
      // Order должен быть 1-based (начинается с 1, а не с 0)
      const newZones = [
        ...currentZones.map((zone, index) => ({
          zoneId: (zone as ZoneWithBlockDto)._id,
          order: index + 1,
        })),
        ...Array.from(selectedZoneIds).map((zoneId, index) => ({
          zoneId,
          order: currentZones.length + index + 1,
        })),
      ];

      await updateBlockMutation.mutateAsync({
        id: blockId,
        data: {
          zones: newZones,
        },
      });

      onSuccess?.();
    } catch (error) {
      console.error("Помилка додавання зон:", error);
    }
  };

  return (
    <AddZonesFormView
      search={search}
      onSearchChange={setSearch}
      zones={availableZones}
      selectedZoneIds={selectedZoneIds}
      onToggleZone={handleToggleZone}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={updateBlockMutation.isPending}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage ?? false}
      fetchNextPage={fetchNextPage}
    />
  );
}

