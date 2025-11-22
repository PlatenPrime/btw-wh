import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddZonesForm } from "@/modules/blocks/components/forms/add-zones-form";
import type { BlockDto } from "@/modules/blocks/api/types";

interface AddZonesToBlockDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  block: BlockDto;
}

export function AddZonesToBlockDialog({
  open: controlledOpen,
  onOpenChange,
  block,
}: AddZonesToBlockDialogProps) {
  const handleSuccess = () => {
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col">
        <DialogHeader>
          <DialogTitle>Додати зони до блоку {block.title}</DialogTitle>
        </DialogHeader>
        <AddZonesForm
          blockId={block._id}
          enabled={controlledOpen}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}

