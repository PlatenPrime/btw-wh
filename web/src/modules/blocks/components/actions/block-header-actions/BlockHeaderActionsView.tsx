import { RenameBlockDialog } from "@/modules/blocks/components/dialogs/rename-block-dialog/RenameBlockDialog";

interface BlockHeaderActionsViewProps {
  blockId: string;
  blockTitle: string;
  renameDialogOpen: boolean;
  onRenameDialogOpenChange: (open: boolean) => void;
}

export function BlockHeaderActionsView({
  blockId,
  blockTitle,
  renameDialogOpen,
  onRenameDialogOpenChange,
}: BlockHeaderActionsViewProps) {
  return (
    <RenameBlockDialog
      blockId={blockId}
      currentTitle={blockTitle}
      open={renameDialogOpen}
      onOpenChange={onRenameDialogOpenChange}
    />
  );
}

