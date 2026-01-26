import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { BlockHeaderActionsView } from "@/modules/blocks/components/actions/block-header-actions/BlockHeaderActionsView";
import { Pencil } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface BlockHeaderActionsProps {
  blockId: string;
  blockTitle: string;
}

export function BlockHeaderActions({
  blockId,
  blockTitle,
}: BlockHeaderActionsProps) {
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);

  const openRenameDialog = useCallback(() => {
    setRenameDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "rename-block",
        label: "Перейменувати",
        icon: Pencil,
        variant: "default",
        onClick: openRenameDialog,
      },
    ],
    [openRenameDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <BlockHeaderActionsView
      blockId={blockId}
      blockTitle={blockTitle}
      renameDialogOpen={renameDialogOpen}
      onRenameDialogOpenChange={setRenameDialogOpen}
    />
  );
}

