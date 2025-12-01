import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateZoneForm } from "@/modules/zones/components/forms/create-zone-form";

interface CreateZoneDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateZoneDialogView({
  onSuccess,
  onCancel,
}: CreateZoneDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Створити зону</DialogTitle>
      </DialogHeader>
      <CreateZoneForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}

