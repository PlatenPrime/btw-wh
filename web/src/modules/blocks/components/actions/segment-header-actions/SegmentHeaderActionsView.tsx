import { AddZonesToSegmentDialog } from "@/modules/blocks/components/dialogs/add-zones-to-segment-dialog";
import type { SegmentDto } from "@/modules/blocks/api/types";

interface SegmentHeaderActionsViewProps {
  segment: SegmentDto;
  addZonesDialogOpen: boolean;
  onAddZonesDialogOpenChange: (open: boolean) => void;
}

export function SegmentHeaderActionsView({
  segment,
  addZonesDialogOpen,
  onAddZonesDialogOpenChange,
}: SegmentHeaderActionsViewProps) {
  return (
    <AddZonesToSegmentDialog
      segment={segment}
      open={addZonesDialogOpen}
      onOpenChange={onAddZonesDialogOpenChange}
    />
  );
}
