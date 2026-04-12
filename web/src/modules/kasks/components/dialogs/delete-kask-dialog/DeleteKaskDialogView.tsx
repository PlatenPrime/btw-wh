import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { KaskDto } from "@/modules/kasks/api/types/dto";

interface DeleteKaskDialogViewProps {
  kask: KaskDto;
  isDeleting: boolean;
  onDelete: () => Promise<void>;
  onCancel: () => void;
}

export function DeleteKaskDialogView({
  kask,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteKaskDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Видалити запис до каси</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          Ви впевнені, що хочете видалити запис для артикулу{" "}
          <strong className="font-mono">{kask.artikul}</strong>
          {kask.nameukr ? (
            <>
              {" "}
              (<span className="line-clamp-2">{kask.nameukr}</span>)
            </>
          ) : null}
          ? Цю дію неможливо скасувати.
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
