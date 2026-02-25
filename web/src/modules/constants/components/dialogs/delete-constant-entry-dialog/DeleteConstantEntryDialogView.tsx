import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ConstantDto } from "@/modules/constants/api/types";
import type { ConstantEntry } from "@/modules/constants/components/dialogs/edit-constant-entry-dialog";

interface DeleteConstantEntryDialogViewProps {
  constant: ConstantDto;
  entry: ConstantEntry;
  isSubmitting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteConstantEntryDialogView({
  constant,
  entry,
  isSubmitting,
  onDelete,
  onCancel,
}: DeleteConstantEntryDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити запис</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          Ви впевнені, що хочете видалити запис{" "}
          <strong>
            {entry.key}: {entry.value}
          </strong>{" "}
          з константи <strong>{constant.title}</strong> ({constant.name})? Цю дію
          неможливо скасувати.
        </p>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          isSubmitting={isSubmitting}
          submitText="Видалити"
          variant="destructive"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}

