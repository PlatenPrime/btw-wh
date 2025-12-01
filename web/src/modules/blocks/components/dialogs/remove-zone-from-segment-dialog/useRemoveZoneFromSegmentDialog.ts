import { useUpdateSegmentMutation } from "@/modules/blocks/api/hooks/mutations/useUpdateSegmentMutation";
import type {
  SegmentDto,
  ZoneWithSegmentDto,
} from "@/modules/blocks/api/types";
import { useMemo } from "react";

interface UseRemoveZoneFromSegmentDialogProps {
  segment: SegmentDto;
  zone: ZoneWithSegmentDto;
  onRemoved?: () => void;
}

interface UseRemoveZoneFromSegmentDialogReturn {
  isRemoving: boolean;
  isZoneLinked: boolean;
  nextZoneIds: string[];
  handleRemoveZone: () => Promise<void>;
}

export function useRemoveZoneFromSegmentDialog({
  segment,
  zone,
  onRemoved,
}: UseRemoveZoneFromSegmentDialogProps): UseRemoveZoneFromSegmentDialogReturn {
  const updateSegmentMutation = useUpdateSegmentMutation();

  const isRemoving = updateSegmentMutation.isPending;
  const isZoneLinked = segment.zones.some((z) => z._id === zone._id);

  const nextZoneIds = useMemo(() => {
    return segment.zones.filter((z) => z._id !== zone._id).map((z) => z._id);
  }, [segment.zones, zone._id]);

  const handleRemoveZone = async () => {
    if (isRemoving) {
      return;
    }

    try {
      await updateSegmentMutation.mutateAsync({
        id: segment._id,
        data: {
          zones: nextZoneIds,
        },
      });
      onRemoved?.();
    } catch (error) {
      console.error("Не вдалося відв'язати зону:", error);
    }
  };

  return {
    isRemoving,
    isZoneLinked,
    nextZoneIds,
    handleRemoveZone,
  };
}
