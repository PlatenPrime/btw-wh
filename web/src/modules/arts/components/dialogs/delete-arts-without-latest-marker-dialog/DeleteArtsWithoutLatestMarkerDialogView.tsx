import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteArtsWithoutLatestMarkerDialogViewProps {
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteArtsWithoutLatestMarkerDialogView({
  isDeleting,
  onDelete,
  onCancel,
}: DeleteArtsWithoutLatestMarkerDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити неактуальні артикули</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете видалити всі артикули без останнього
          актуального маркера? Цю дію неможливо скасувати.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          Будуть видалені всі артикули, у яких маркер відсутній або менший за
          максимальний знайдений маркер. Артикули з максимальним маркером
          залишаться в базі.
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

