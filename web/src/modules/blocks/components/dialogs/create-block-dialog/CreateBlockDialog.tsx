import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateBlockForm } from "@/modules/blocks/components/forms/create-block-form";

interface CreateBlockDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateBlockDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateBlockDialogProps) {
  const handleSuccess = () => {
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Створити блок</DialogTitle>
        </DialogHeader>
        <CreateBlockForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}

