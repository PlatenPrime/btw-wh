import { Dialog } from "@/components/ui/dialog";
import type { BlockDto } from "@/modules/blocks/api/types";
import { useState } from "react";
import { CreateSegmentDialogView } from "./CreateSegmentDialogView";
import { useCreateSegmentDialog } from "./useCreateSegmentDialog";

interface CreateSegmentDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  block: BlockDto;
}

export function CreateSegmentDialog({
  open: controlledOpen,
  onOpenChange,
  block,
}: CreateSegmentDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useCreateSegmentDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <CreateSegmentDialogView
        block={block}
        enabled={open}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

