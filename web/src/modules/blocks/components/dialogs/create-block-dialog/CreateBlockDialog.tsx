import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateBlockForm } from "@/modules/blocks/components/forms/create-block-form/CreateBlockForm";

interface CreateBlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateBlockDialog({
  open,
  onOpenChange,
}: CreateBlockDialogProps) {
  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Новий блок</DialogTitle>
        </DialogHeader>
        <CreateBlockForm onSuccess={handleClose} onCancel={handleClose} />
      </DialogContent>
    </Dialog>
  );
}

