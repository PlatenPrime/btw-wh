import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";

interface DeletePalletGroupHeaderDialogViewProps {
  group: PalletGroupDto;
  isDeleting: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export function DeletePalletGroupHeaderDialogView({
  group,
  isDeleting,
  onDelete,
  onCancel,
}: DeletePalletGroupHeaderDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Видалити групу палет</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете видалити групу &quot;{group.title}&quot;?
          Палети залишаться в системі, але втратять прив&apos;язку до цієї
          групи.
        </DialogDescription>
      </DialogHeader>
      <div className="pt-4">
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          cancelText="Скасувати"
          submitText="Видалити"
          isSubmitting={isDeleting}
          variant="destructive"
        />
      </div>
    </DialogContent>
  );
}
