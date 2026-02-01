import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UnlinkPalletConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
  palletTitle?: string;
}

export function UnlinkPalletConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  isPending,
  palletTitle,
}: UnlinkPalletConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Відв&apos;язати палету від групи</DialogTitle>
          <DialogDescription>
            {palletTitle ? (
              <>
                Ви впевнені, що хочете відв&apos;язати палету &quot;
                {palletTitle}&quot; від групи? Палета залишиться в системі.
              </>
            ) : (
              <>
                Ви впевнені, що хочете відв&apos;язати палету від групи? Палета
                залишиться в системі.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onConfirm}
          submitText="Відв'язати від групи"
          isSubmitting={isPending}
          variant="destructive"
        />
      </DialogContent>
    </Dialog>
  );
}
