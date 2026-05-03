import { Dialog } from "@/components/ui/dialog";
import { useClearSkugrSkusMutation } from "@/modules/skugrs/api/hooks/mutations/useClearSkugrSkusMutation";
import { ClearSkugrSkusDialogView } from "@/modules/skugrs/components/dialogs/clear-skugr-skus-dialog/ClearSkugrSkusDialogView";
import { useCallback } from "react";

interface ClearSkugrSkusDialogProps {
  skugrId: string;
  skugrTitle: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ClearSkugrSkusDialog({
  skugrId,
  skugrTitle,
  open,
  onOpenChange,
}: ClearSkugrSkusDialogProps) {
  const mutation = useClearSkugrSkusMutation();

  const handleConfirm = useCallback(async () => {
    try {
      await mutation.mutateAsync(skugrId);
      onOpenChange(false);
    } catch {
      // toast у мутації
    }
  }, [mutation, onOpenChange, skugrId]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <ClearSkugrSkusDialogView
        skugrTitle={skugrTitle}
        isClearing={mutation.isPending}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
