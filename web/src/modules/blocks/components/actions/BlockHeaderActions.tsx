import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RenameBlockDialog } from "@/modules/blocks/components/dialogs/rename-block-dialog/RenameBlockDialog";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface BlockHeaderActionsProps {
    blockId: string;
    blockTitle: string;
}

export function BlockHeaderActions({
    blockId,
    blockTitle,
}: BlockHeaderActionsProps) {
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);

    useRegisterHeaderActions([
        {
            id: "rename-block",
            label: "Перейменувати",
            icon: Pencil,
            onClick: () => setRenameDialogOpen(true),
        },
    ]);

    return (
        <RenameBlockDialog
            blockId={blockId}
            currentTitle={blockTitle}
            open={renameDialogOpen}
            onOpenChange={setRenameDialogOpen}
        />
    );
}
