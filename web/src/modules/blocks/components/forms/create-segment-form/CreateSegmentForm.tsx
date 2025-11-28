import { useState, useMemo } from "react";
import { useCreateSegmentMutation } from "@/modules/blocks/api/hooks/mutations/useCreateSegmentMutation";
import { useZonesInfiniteQuery } from "@/modules/blocks/api/hooks/queries/useZonesInfiniteQuery";
import { useSegmentsByBlockQuery } from "@/modules/blocks/api/hooks/queries/useSegmentsByBlockQuery";
import type { BlockDto } from "@/modules/blocks/api/types";
import { CreateSegmentFormView } from "./CreateSegmentFormView";

interface CreateSegmentFormProps {
  block: BlockDto;
  enabled?: boolean;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateSegmentForm({
  block,
  enabled = true,
  onSuccess,
  onCancel,
}: CreateSegmentFormProps) {
  const [search, setSearch] = useState("");
  const [selectedZoneIds, setSelectedZoneIds] = useState<Set<string>>(new Set());
  const createSegmentMutation = useCreateSegmentMutation();

  // Получаем существующие сегменты блока для вычисления order
  const { data: segmentsData } = useSegmentsByBlockQuery({
    blockId: block._id,
    enabled: enabled,
  });

  // Вычисляем order автоматически: максимальный order + 1, или 1 если сегментов нет
  const order = useMemo(() => {
    const segments = segmentsData?.data ?? [];
    if (segments.length === 0) {
      return 1;
    }
    const maxOrder = Math.max(...segments.map((seg) => seg.order));
    return maxOrder + 1;
  }, [segmentsData]);

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

  // Фильтруем только свободные зоны (без сегмента)
  const availableZones = allZones.filter((zone) => {
    const zoneWithSeg = zone as { seg?: { id: string } };
    return !zoneWithSeg.seg;
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
      await createSegmentMutation.mutateAsync({
        blockData: {
          _id: block._id,
          title: block.title,
        },
        order,
        zones: Array.from(selectedZoneIds),
      });

      onSuccess?.();
    } catch (error) {
      console.error("Помилка створення сегмента:", error);
    }
  };

  return (
    <CreateSegmentFormView
      search={search}
      onSearchChange={setSearch}
      zones={availableZones}
      selectedZoneIds={selectedZoneIds}
      onToggleZone={handleToggleZone}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      isLoading={createSegmentMutation.isPending}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage ?? false}
      fetchNextPage={fetchNextPage}
    />
  );
}

