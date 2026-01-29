import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResetPalletsSectorsConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function ResetPalletsSectorsConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  isPending,
}: ResetPalletsSectorsConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Скинути сектора</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете скинути сектори всіх палет і прибрати
            зв&apos;язок з групами? Дію не можна скасувати.
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
            {isPending ? "Скидання..." : "Скинути сектора"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
