import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { RenameBlockDialogView } from "./RenameBlockDialogView";
import { useRenameBlockDialog } from "./useRenameBlockDialog";

interface RenameBlockDialogProps {
    blockId: string;
    currentTitle: string;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function RenameBlockDialog({
    blockId,
    currentTitle,
    open: controlledOpen,
    onOpenChange,
}: RenameBlockDialogProps) {
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;
    const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

    const { handleSuccess, handleCancel } = useRenameBlockDialog({
        onOpenChange: handleOpenChange,
    });

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <RenameBlockDialogView
                blockId={blockId}
                currentTitle={currentTitle}
                onSuccess={handleSuccess}
                onCancel={handleCancel}
            />
        </Dialog>
    );
}
