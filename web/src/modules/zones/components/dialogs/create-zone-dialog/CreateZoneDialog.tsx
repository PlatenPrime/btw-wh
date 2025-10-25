import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CreateZoneForm } from "@/modules/zones/components/forms/create-zone-form";

interface CreateZoneDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateZoneDialog({ open: controlledOpen, onOpenChange }: CreateZoneDialogProps) {
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
          <DialogTitle>Создать зону</DialogTitle>
        </DialogHeader>
        <CreateZoneForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}


