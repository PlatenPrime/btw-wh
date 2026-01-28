import { Dialog } from "@/components/ui/dialog";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { RenamePalletGroupDialogView } from "@/modules/pallet-groups/components/dialogs/rename-pallet-group-dialog/RenamePalletGroupDialogView";
import { useState } from "react";

interface RenamePalletGroupDialogProps {
  group: PalletGroupDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function RenamePalletGroupDialog({
  group,
  open: controlledOpen,
  onOpenChange,
}: RenamePalletGroupDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <RenamePalletGroupDialogView
        group={group}
        onClose={() => handleOpenChange?.(false)}
      />
    </Dialog>
  );
}
