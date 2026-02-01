import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RenamePalletGroupForm } from "@/modules/pallet-groups/components/forms/rename-pallet-group-form/RenamePalletGroupForm";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";

interface RenamePalletGroupDialogViewProps {
  group: PalletGroupDto;
  onClose: () => void;
}

export function RenamePalletGroupDialogView({
  group,
  onClose,
}: RenamePalletGroupDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Перейменувати групу палет</DialogTitle>
      </DialogHeader>
      <div className="pt-2">
        <RenamePalletGroupForm
          group={group}
          onSuccess={onClose}
          onCancel={onClose}
        />
      </div>
    </DialogContent>
  );
}
