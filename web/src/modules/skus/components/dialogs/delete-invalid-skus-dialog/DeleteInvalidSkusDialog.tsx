import { Dialog } from "@/components/ui/dialog";
import { useDeleteInvalidSkusMutation } from "@/modules/skus/api/hooks/mutations/useDeleteInvalidSkusMutation";
import { useCallback } from "react";
import { DeleteInvalidSkusDialogView } from "./DeleteInvalidSkusDialogView";

interface DeleteInvalidSkusDialogProps {
  konkName: string;
  konkLabel: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteInvalidSkusDialog({
  konkName,
  konkLabel,
  open,
  onOpenChange,
}: DeleteInvalidSkusDialogProps) {
  const mutation = useDeleteInvalidSkusMutation();

  const handleDelete = useCallback(async () => {
    try {
      await mutation.mutateAsync({ konkName });
      onOpenChange(false);
    } catch {
      // toast у мутації
    }
  }, [konkName, mutation, onOpenChange]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DeleteInvalidSkusDialogView
        konkLabel={konkLabel}
        isDeleting={mutation.isPending}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
