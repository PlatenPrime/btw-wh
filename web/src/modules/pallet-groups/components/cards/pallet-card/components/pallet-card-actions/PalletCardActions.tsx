import {
  CardActionsMenu,
  type CardAction,
} from "@/components/shared/card-actions";
import type { PalletShortDto } from "@/modules/pallet-groups/api/types";
import { UnlinkPalletConfirmDialog } from "@/modules/pallet-groups/components/dialogs/unlink-pallet-confirm-dialog/UnlinkPalletConfirmDialog";
import { Unlink } from "lucide-react";
import { useState } from "react";

interface PalletCardActionsProps {
  pallet: PalletShortDto;
  onUnlink?: (pallet: PalletShortDto) => void | Promise<void>;
}

export function PalletCardActions({
  pallet,
  onUnlink,
}: PalletCardActionsProps) {
  const [isUnlinkDialogOpen, setIsUnlinkDialogOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleConfirmUnlink = async () => {
    if (!onUnlink) return;
    setIsPending(true);
    try {
      await onUnlink(pallet);
      setIsUnlinkDialogOpen(false);
    } finally {
      setIsPending(false);
    }
  };

  const actions: CardAction[] =
    onUnlink != null
      ? [
          {
            id: "unlink",
            label: "Відв'язати від групи",
            icon: Unlink,
            variant: "destructive",
            onClick: () => setIsUnlinkDialogOpen(true),
          },
        ]
      : [];

  if (actions.length === 0) {
    return null;
  }

  return (
    <>
      <CardActionsMenu
        actions={actions}
        orientation="vertical"
        size="sm"
        align="end"
      />

      <UnlinkPalletConfirmDialog
        open={isUnlinkDialogOpen}
        onOpenChange={setIsUnlinkDialogOpen}
        onConfirm={handleConfirmUnlink}
        onCancel={() => setIsUnlinkDialogOpen(false)}
        isPending={isPending}
        palletTitle={pallet.title}
      />
    </>
  );
}
