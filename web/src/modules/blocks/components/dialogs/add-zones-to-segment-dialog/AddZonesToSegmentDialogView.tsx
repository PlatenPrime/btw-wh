import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AddZonesToSegmentForm } from "@/modules/blocks/components/forms/add-zones-to-segment-form";
import type { SegmentDto } from "@/modules/blocks/api/types";

interface AddZonesToSegmentDialogViewProps {
  segment: SegmentDto;
  enabled: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export function AddZonesToSegmentDialogView({
  segment,
  enabled,
  onSuccess,
  onCancel,
}: AddZonesToSegmentDialogViewProps) {
  return (
    <DialogContent className="flex flex-col sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Додати зони до сегмента #{segment.order}</DialogTitle>
      </DialogHeader>
      <AddZonesToSegmentForm
        segment={segment}
        enabled={enabled}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </DialogContent>
  );
}

