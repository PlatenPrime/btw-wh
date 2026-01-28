import { Dialog } from "@/components/ui/dialog";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { DeletePalletGroupHeaderDialogView } from "@/modules/pallet-groups/components/dialogs/delete-pallet-group-header-dialog/DeletePalletGroupHeaderDialogView";
import { useState } from "react";

interface DeletePalletGroupHeaderDialogProps {
  group: PalletGroupDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onDeleted?: () => void;
}

export function DeletePalletGroupHeaderDialog({
  group,
  open: controlledOpen,
  onOpenChange,
  onDeleted,
}: DeletePalletGroupHeaderDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DeletePalletGroupHeaderDialogView
        group={group}
        onClose={() => handleOpenChange?.(false)}
        onDeleted={onDeleted}
      />
    </Dialog>
  );
}
