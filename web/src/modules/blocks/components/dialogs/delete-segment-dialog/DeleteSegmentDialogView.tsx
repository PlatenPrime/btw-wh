import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { SegmentDto } from "@/modules/blocks/api/types";

interface DeleteSegmentDialogViewProps {
  segment: SegmentDto;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteSegmentDialogView({
  segment,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteSegmentDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити сегмент</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          Ви впевнені, що хочете видалити сегмент #{segment.order}? Це дію
          неможливо скасувати. Всі зони, пов'язані з цим сегментом, будуть
          відв'язані від сегмента.
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

