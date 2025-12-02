import { Dialog } from "@/components/ui/dialog";
import type { SegmentDto } from "@/modules/blocks/api/types";
import { useState } from "react";
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
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useAddZonesToSegmentDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <AddZonesToSegmentDialogView
        segment={segment}
        enabled={open}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

