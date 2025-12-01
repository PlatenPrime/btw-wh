import type {
  SegmentDto,
  ZoneWithSegmentDto,
} from "@/modules/blocks/api/types";
import { RemoveZoneFromSegmentDialogView } from "./RemoveZoneFromSegmentDialogView";
import { useRemoveZoneFromSegmentDialog } from "./useRemoveZoneFromSegmentDialog";

interface RemoveZoneFromSegmentDialogProps {
  segment: SegmentDto;
  zone: ZoneWithSegmentDto;
  onRemoved?: () => void;
  onClose: () => void;
}

export function RemoveZoneFromSegmentDialog({
  segment,
  zone,
  onRemoved,
  onClose,
}: RemoveZoneFromSegmentDialogProps) {
  const { isRemoving, isZoneLinked, handleRemoveZone } =
    useRemoveZoneFromSegmentDialog({
      segment,
      zone,
      onRemoved,
    });

  const handleRemove = async () => {
    await handleRemoveZone();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <RemoveZoneFromSegmentDialogView
      segment={segment}
      zone={zone}
      isRemoving={isRemoving}
      isZoneLinked={isZoneLinked}
      onRemove={handleRemove}
      onCancel={handleCancel}
    />
  );
}
