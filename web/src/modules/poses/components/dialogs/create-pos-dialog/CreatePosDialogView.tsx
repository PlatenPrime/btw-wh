import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { CreatePosForm } from "@/modules/poses/components/forms/create-pos-form/CreatePosForm";

interface CreatePosDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess: (newPosId?: string) => void;
  onCancel: () => void;
}

const defaultTrigger = (
  <Button variant="outline" size="sm">
    Додати позицію
  </Button>
);

export function CreatePosDialogView({
  open,
  setOpen,
  pallet,
  trigger,
  onSuccess,
  onCancel,
}: CreatePosDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Створити нову позицію
          </DialogTitle>
        </DialogHeader>
        <CreatePosForm
          pallet={pallet}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
