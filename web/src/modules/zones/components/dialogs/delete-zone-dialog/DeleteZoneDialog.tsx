import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteZoneMutation } from "@/modules/zones/api/hooks/mutations/useDeleteZoneMutation";
import type { ZoneDto } from "@/modules/zones/api/types";

interface DeleteZoneDialogProps {
  zone: ZoneDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteZoneDialog({
  zone,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteZoneDialogProps) {
  const mutation = useDeleteZoneMutation();

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(zone._id);
      onOpenChange?.(false);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка видалення зони:", error);
    }
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Видалити зону</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Ви впевнені, що хочете видалити зону <strong>{zone.title}</strong>?
            Це дію неможливо скасувати.
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
