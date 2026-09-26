import { Dialog } from "@/components/ui/dialog";
import { usePurgePromotedFromNewskuMutation } from "@/modules/skugrs/api/hooks/mutations/usePurgePromotedFromNewskuMutation";
import { PurgePromotedFromNewskuDialogView } from "@/modules/skugrs/components/dialogs/purge-promoted-from-newsku-dialog/PurgePromotedFromNewskuDialogView";
import { useCallback } from "react";

interface PurgePromotedFromNewskuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PurgePromotedFromNewskuDialog({
  open,
  onOpenChange,
}: PurgePromotedFromNewskuDialogProps) {
  const mutation = usePurgePromotedFromNewskuMutation();

  const handleConfirm = useCallback(async () => {
    try {
      await mutation.mutateAsync();
      onOpenChange(false);
    } catch {
      // toast у мутації
    }
  }, [mutation, onOpenChange]);

  const handleCancel = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <PurgePromotedFromNewskuDialogView
        isPurging={mutation.isPending}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
