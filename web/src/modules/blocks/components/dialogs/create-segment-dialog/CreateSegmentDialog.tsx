import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateSegmentForm } from "@/modules/blocks/components/forms/create-segment-form";
import type { BlockDto } from "@/modules/blocks/api/types";

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
          <DialogTitle>Створити сегмент для блоку {block.title}</DialogTitle>
        </DialogHeader>
        <CreateSegmentForm
          block={block}
          enabled={controlledOpen}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

