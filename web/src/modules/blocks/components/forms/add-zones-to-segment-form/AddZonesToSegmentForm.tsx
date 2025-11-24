import { useState } from "react";
import { useUpdateSegmentMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateSegmentMutation";
import { useZonesInfiniteQuery } from "@/modules/blocks/api/hooks/queries/useZonesInfiniteQuery";
import { useZonesBySegmentQuery } from "@/modules/blocks/api/hooks/queries/useZonesBySegmentQuery";
import type { SegmentDto } from "@/modules/blocks/api/types";
import { AddZonesToSegmentFormView } from "./AddZonesToSegmentFormView";

interface AddZonesToSegmentFormProps {
  segment: SegmentDto;
  enabled?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function AddZonesToSegmentForm({
  segment,
  enabled = true,
  onSuccess,
  onCancel,
}: AddZonesToSegmentFormProps) {
  const [search, setSearch] = useState("");
  const [selectedZoneIds, setSelectedZoneIds] = useState<Set<string>>(new Set());
  const updateSegmentMutation = useUpdateSegmentMutation();

  // Получаем текущие зоны сегмента через API
  const { data: zonesDataForSegment } = useZonesBySegmentQuery({
    segId: segment._id,
    enabled: enabled,
  });

  const currentZones = zonesDataForSegment?.data ?? [];
  const currentZoneIds = new Set(currentZones.map((zone) => zone._id));

  // Получаем все зоны с infinite scroll для поиска
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
  const allZones = zonesData?.pages.flatMap((page) => page.data) ?? [];

  // Фильтруем только свободные зоны (без сегмента) и исключаем зоны, которые уже в этом сегменте
  const availableZones = allZones.filter((zone) => {
    const zoneWithSeg = zone as { seg?: { id: string } };
    return !zoneWithSeg.seg && !currentZoneIds.has(zone._id);
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
        ...currentZones.map((zone) => zone._id),
        ...Array.from(selectedZoneIds),
      ];

      await updateSegmentMutation.mutateAsync({
        id: segment._id,
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
    <AddZonesToSegmentFormView
      search={search}
      onSearchChange={setSearch}
      zones={availableZones}
      selectedZoneIds={selectedZoneIds}
      onToggleZone={handleToggleZone}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={updateSegmentMutation.isPending}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage ?? false}
      fetchNextPage={fetchNextPage}
    />
  );
}

