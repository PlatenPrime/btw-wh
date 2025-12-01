import { Dialog } from "@/components/ui/dialog";
import type { BlockDto } from "@/modules/blocks/api/types";
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
  const { handleSuccess, handleCancel } = useCreateSegmentDialog({
    onOpenChange,
  });

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <CreateSegmentDialogView
        block={block}
        enabled={controlledOpen ?? false}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}

