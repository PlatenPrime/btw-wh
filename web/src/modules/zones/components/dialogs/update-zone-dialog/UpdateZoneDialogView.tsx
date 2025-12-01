import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ZoneDto } from "@/modules/zones/api/types";
import { UpdateZoneForm } from "@/modules/zones/components/forms/update-zone-form";

interface UpdateZoneDialogViewProps {
  zone: ZoneDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateZoneDialogView({
  zone,
  onSuccess,
  onCancel,
}: UpdateZoneDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Редагувати зону</DialogTitle>
      </DialogHeader>
      <UpdateZoneForm zone={zone} onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
