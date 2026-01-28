import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { AddPalletsToGroupForm } from "@/modules/pallet-groups/components/forms/add-pallets-to-group-form/AddPalletsToGroupForm";

interface AddPalletsToGroupDialogViewProps {
  group: PalletGroupDto;
  enabled: boolean;
  onClose: () => void;
}

export function AddPalletsToGroupDialogView({
  group,
  enabled,
  onClose,
}: AddPalletsToGroupDialogViewProps) {
  return (
    <DialogContent className="flex flex-col sm:max-w-[700px]">
      <DialogHeader>
        <DialogTitle>
          Додати палети до групи &quot;{group.title}&quot;
        </DialogTitle>
      </DialogHeader>
      <AddPalletsToGroupForm
        groupId={group.id}
        enabled={enabled}
        onClose={onClose}
      />
    </DialogContent>
  );
}
