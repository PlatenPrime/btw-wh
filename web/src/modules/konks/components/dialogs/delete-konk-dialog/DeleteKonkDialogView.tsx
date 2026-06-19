import { DialogActions } from "@/components/shared/dialogs";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { KonkDto } from "@/modules/konks/api/types";
import { typography } from "@/lib/typography";

interface DeleteKonkDialogViewProps {
  konk: KonkDto;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteKonkDialogView({
  konk,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteKonkDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити конкурента</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Ви впевнені, що хочете видалити конкурента <strong>{konk.title}</strong> (
          {konk.name})? Цю дію неможливо скасувати.
        </p>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          isSubmitting={isDeleting}
          submitText="Видалити"
          variant="destructive"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
