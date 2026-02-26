import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AnalogDto } from "@/modules/analogs/api/types";

interface DeleteAnalogDialogViewProps {
  analog: AnalogDto;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteAnalogDialogView({
  analog,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteAnalogDialogViewProps) {
  const label =
    analog.title || analog.nameukr || analog.artikul || analog.url || analog._id;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити аналог</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          Ви впевнені, що хочете видалити аналог{" "}
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
