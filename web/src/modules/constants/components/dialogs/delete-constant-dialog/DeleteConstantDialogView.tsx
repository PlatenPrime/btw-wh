import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ConstantDto } from "@/modules/constants/api/types";

interface DeleteConstantDialogViewProps {
  constant: ConstantDto;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteConstantDialogView({
  constant,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteConstantDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити константу</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          Ви впевнені, що хочете видалити константу <strong>{constant.title}</strong> (
          {constant.name})? Цю дію неможливо скасувати.
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
