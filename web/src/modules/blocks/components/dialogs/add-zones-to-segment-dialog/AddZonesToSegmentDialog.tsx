import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddZonesToSegmentForm } from "@/modules/blocks/components/forms/add-zones-to-segment-form";
import type { SegmentDto } from "@/modules/blocks/api/types";

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
  const handleSuccess = () => {
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Додати зони до сегмента #{segment.order}</DialogTitle>
        </DialogHeader>
        <AddZonesToSegmentForm
          segment={segment}
          enabled={controlledOpen}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

