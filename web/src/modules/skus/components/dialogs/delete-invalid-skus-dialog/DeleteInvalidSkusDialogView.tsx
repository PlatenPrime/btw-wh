import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteInvalidSkusDialogViewProps {
  konkLabel: string;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteInvalidSkusDialogView({
  konkLabel,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteInvalidSkusDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[440px]">
      <DialogHeader>
        <DialogTitle>Видалити невалідні SKU</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          Буде видалено <strong>усі</strong> товари конкурента{" "}
          <strong>{konkLabel}</strong> з позначкою невалідності (
          <code className="text-xs">isInvalid: true</code>). Інші SKU не
          зміняться. Цю дію неможливо скасувати.
        </p>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          isSubmitting={isDeleting}
          submitText="Видалити невалідні"
          submitLoadingText="Видалення..."
          variant="destructive"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
