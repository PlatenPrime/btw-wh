import { Dialog } from "@/components/ui/dialog";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { DeletePalletGroupDialogView } from "@/modules/pallet-groups/components/dialogs/delete-pallet-group-dialog/DeletePalletGroupDialogView";
import { useState } from "react";

interface DeletePalletGroupDialogProps {
  group: PalletGroupDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeletePalletGroupDialog({
  group,
  open: controlledOpen,
  onOpenChange,
}: DeletePalletGroupDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DeletePalletGroupDialogView
        group={group}
        onClose={() => handleOpenChange?.(false)}
      />
    </Dialog>
  );
}
