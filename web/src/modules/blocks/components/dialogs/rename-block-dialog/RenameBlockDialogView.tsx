import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { RenameBlockForm } from "@/modules/blocks/components/forms/rename-block-form/RenameBlockForm";

interface RenameBlockDialogViewProps {
    blockId: string;
    currentTitle: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export function RenameBlockDialogView({
    blockId,
    currentTitle,
    onSuccess,
    onCancel,
}: RenameBlockDialogViewProps) {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Перейменувати блок</DialogTitle>
            </DialogHeader>
            <RenameBlockForm
                blockId={blockId}
                currentTitle={currentTitle}
                onSuccess={onSuccess}
                onCancel={onCancel}
            />
        </DialogContent>
    );
}
