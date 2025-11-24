import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteSegmentMutation } from "@/modules/blocks/api/hooks/mutations/useDeleteSegmentMutation";
import type { SegmentDto } from "@/modules/blocks/api/types";

interface DeleteSegmentDialogProps {
  segment: SegmentDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteSegmentDialog({
  segment,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteSegmentDialogProps) {
  const mutation = useDeleteSegmentMutation();

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(segment._id);
      onOpenChange?.(false);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення сегмента:", error);
    }
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
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

