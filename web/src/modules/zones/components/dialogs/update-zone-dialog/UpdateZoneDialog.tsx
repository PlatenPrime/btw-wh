import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { ZoneDto } from "@/modules/zones/api/types";
import { UpdateZoneForm } from "@/modules/zones/components/forms/update-zone-form";

interface UpdateZoneDialogProps {
  zone: ZoneDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UpdateZoneDialog({ zone, open: controlledOpen, onOpenChange }: UpdateZoneDialogProps) {
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
          <DialogTitle>Редактировать зону</DialogTitle>
        </DialogHeader>
        <UpdateZoneForm zone={zone} onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}


