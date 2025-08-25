import { MoveTrigger } from "@/components/triggers/move-trigger.tsx/MoveTrigger";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import type { IPallet } from "@/modules/pallets/api/types";

interface MovePalletPosesDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess: () => void;
  onCancel: () => void;
  pallet: IPallet;
}

export function MovePalletPosesDialogView({
  open,
  setOpen,
  //   onSuccess,
  //   onCancel,
  //   pallet,
}: MovePalletPosesDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MoveTrigger />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Перемістити позиції</DialogTitle>
        </DialogHeader>
        Форма для переміщення
      </DialogContent>
    </Dialog>
  );
}
