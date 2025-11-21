import { useState } from "react";
import { useUpdateBlockMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateBlockMutation";
import { useZonesInfiniteQuery } from "@/modules/blocks/api/hooks/queries/useZonesInfiniteQuery";
import type { ZoneWithBlockDto } from "@/modules/blocks/api/types";
import { AddZonesFormView } from "./AddZonesFormView";

interface AddZonesFormProps {
  blockId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddZonesForm({
  blockId,
  onSuccess,
  onCancel,
}: AddZonesFormProps) {
  const [search, setSearch] = useState("");
  const [selectedZoneIds, setSelectedZoneIds] = useState<Set<string>>(new Set());
  const updateBlockMutation = useUpdateBlockMutation();

  // Получаем текущие зоны блока через useZonesQuery
  const { data: zonesDataForBlock } = useZonesInfiniteQuery({
    limit: 100, // Максимальный лимит API
    search: "",
    enabled: true,
  });

  const allZonesForBlock =
    zonesDataForBlock?.pages.flatMap((page) => page.data) ?? [];
  const currentZones = allZonesForBlock.filter((zone) => {
    const zoneWithBlock = zone as unknown as ZoneWithBlockDto;
    return zoneWithBlock.block?.id === blockId;
  });

  // Получаем все зоны с infinite scroll
  const {
    data: zonesData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useZonesInfiniteQuery({
    limit: 20,
    search,
    enabled: true,
  });

  // Собираем все зоны из всех страниц
  const allZones =
    zonesData?.pages.flatMap((page) => page.data) ?? [];

  // Фильтруем зоны, которые уже в блоке
  const availableZones = allZones.filter((zone) => {
    const zoneWithBlock = zone as unknown as ZoneWithBlockDto;
    return !zoneWithBlock.block || zoneWithBlock.block.id !== blockId;
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
      const newZones = [
        ...currentZones.map((zone, index) => ({
          zoneId: (zone as ZoneWithBlockDto)._id,
          order: index,
        })),
        ...Array.from(selectedZoneIds).map((zoneId, index) => ({
          zoneId,
          order: currentZones.length + index,
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

