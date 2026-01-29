import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isPending}>
            Скасувати
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? "Відв'язування..." : "Відв'язати від групи"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
