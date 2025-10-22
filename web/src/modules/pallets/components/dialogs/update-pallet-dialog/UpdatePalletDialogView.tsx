import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { UpdatePalletForm } from "@/modules/pallets/components/forms/update-pallet-form/UpdatePalletForm";

interface UpdatePalletDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pallet: PalletShortDto;
  rowId: string;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  onCancel: () => void;
}

const defaultTrigger = <Button variant="outline">Редагувати</Button>;

export function UpdatePalletDialogView({
  open,
  setOpen,
  pallet,
  rowId,
  trigger,
  onSuccess,
  onCancel,
}: UpdatePalletDialogViewProps) {
  // Если open управляется внешне (controlled mode), не показываем триггер
  const isControlled = open !== undefined;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {!isControlled && (
        <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Редагувати палету</DialogTitle>
        </DialogHeader>
        <UpdatePalletForm
          pallet={pallet}
          rowId={rowId}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
