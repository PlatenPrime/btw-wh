import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteBlockMutation } from "@/modules/blocks/api/hooks/mutations/useDeleteBlockMutation";
import type { BlockDto } from "@/modules/blocks/api/types";

interface DeleteBlockDialogProps {
  block: BlockDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteBlockDialog({
  block,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteBlockDialogProps) {
  const mutation = useDeleteBlockMutation();

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(block._id);
      onOpenChange?.(false);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення блоку:", error);
    }
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Видалити блок</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <p className="text-muted-foreground text-sm">
            Ви впевнені, що хочете видалити блок <strong>{block.title}</strong>?
            Це дію неможливо скасувати. Всі зони, пов'язані з цим блоком, будуть
            відв'язані від блоку.
          </p>
          <DialogActions
            onCancel={handleCancel}
            onSubmit={handleDelete}
            isSubmitting={mutation.isPending}
            submitText="Видалити"
            variant="destructive"
            className="justify-end"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

