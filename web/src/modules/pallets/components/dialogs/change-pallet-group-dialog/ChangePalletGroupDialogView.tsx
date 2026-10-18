import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChangePalletGroupForm } from "@/modules/pallets/components/forms/change-pallet-group-form/ChangePalletGroupForm";

interface ChangePalletGroupDialogViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  palletId: string;
  palletTitle: string;
  currentGroupId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function ChangePalletGroupDialogView({
  open,
  onOpenChange,
  palletId,
  palletTitle,
  currentGroupId,
  onSuccess,
  onCancel,
}: ChangePalletGroupDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Змінити палетну групу</DialogTitle>
          <DialogDescription>
            Оберіть групу для палети &quot;{palletTitle}&quot;. Палета буде
            додана в кінець списку групи.
          </DialogDescription>
        </DialogHeader>
        {open ? (
          <ChangePalletGroupForm
            key={`${palletId}-${currentGroupId ?? "none"}`}
            palletId={palletId}
            currentGroupId={currentGroupId}
            enabled={open}
            onSuccess={onSuccess}
            onCancel={onCancel}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
