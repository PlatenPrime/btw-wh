import { Dialog } from "@/components/ui/dialog";
import type { SegmentDto } from "@/modules/blocks/api/types";
import { AddZonesToSegmentDialogView } from "./AddZonesToSegmentDialogView";
import { useAddZonesToSegmentDialog } from "./useAddZonesToSegmentDialog";

interface AddZonesToSegmentDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  segment: SegmentDto;
}

export function AddZonesToSegmentDialog({
  open: controlledOpen,
  onOpenChange,
  segment,
}: AddZonesToSegmentDialogProps) {
  const { handleSuccess, handleCancel } = useAddZonesToSegmentDialog({
    onOpenChange,
  });

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <AddZonesToSegmentDialogView
        segment={segment}
        enabled={controlledOpen ?? false}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

