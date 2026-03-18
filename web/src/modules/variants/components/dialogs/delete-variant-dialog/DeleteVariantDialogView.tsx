import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { VariantDto } from "@/modules/variants/api/types";

interface DeleteVariantDialogViewProps {
  variant: VariantDto;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteVariantDialogView({
  variant,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteVariantDialogViewProps) {
  const label = variant.title || variant.url || variant._id;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити варіант</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          Ви впевнені, що хочете видалити варіант{" "}
          <strong>{String(label).slice(0, 50)}</strong>? Цю дію неможливо
          скасувати.
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

