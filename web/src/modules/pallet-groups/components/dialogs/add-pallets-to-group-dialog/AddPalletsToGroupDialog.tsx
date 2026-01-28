import { Dialog } from "@/components/ui/dialog";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { AddPalletsToGroupDialogView } from "@/modules/pallet-groups/components/dialogs/add-pallets-to-group-dialog/AddPalletsToGroupDialogView";
import { useState } from "react";

interface AddPalletsToGroupDialogProps {
  group: PalletGroupDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddPalletsToGroupDialog({
  group,
  open: controlledOpen,
  onOpenChange,
}: AddPalletsToGroupDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <AddPalletsToGroupDialogView
        group={group}
        enabled={open}
        onClose={() => handleOpenChange?.(false)}
      />
    </Dialog>
  );
}
