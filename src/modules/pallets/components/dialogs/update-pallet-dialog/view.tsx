import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PalletShortDto } from "@/modules/rows/api/types/dto";
import { UpdatePalletForm } from "../../forms/update-pallet-form";

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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
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
