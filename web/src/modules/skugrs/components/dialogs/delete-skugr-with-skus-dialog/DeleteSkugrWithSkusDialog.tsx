import { Dialog } from "@/components/ui/dialog";
import { useDeleteSkugrWithSkusMutation } from "@/modules/skugrs/api/hooks/mutations/useDeleteSkugrWithSkusMutation";
import { DeleteSkugrWithSkusDialogView } from "@/modules/skugrs/components/dialogs/delete-skugr-with-skus-dialog/DeleteSkugrWithSkusDialogView";
import { useCallback } from "react";

interface DeleteSkugrWithSkusDialogProps {
  skugrId: string;
  skugrTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteSkugrWithSkusDialog({
  skugrId,
  skugrTitle,
  open,
  onOpenChange,
  onSuccess,
}: DeleteSkugrWithSkusDialogProps) {
  const mutation = useDeleteSkugrWithSkusMutation();

  const handleDelete = useCallback(async () => {
    try {
      await mutation.mutateAsync(skugrId);
      onOpenChange(false);
      onSuccess?.();
    } catch {
      // toast у мутації
    }
  }, [mutation, onOpenChange, onSuccess, skugrId]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DeleteSkugrWithSkusDialogView
        skugrTitle={skugrTitle}
        isDeleting={mutation.isPending}
        onDelete={handleDelete}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
