import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateAskForm } from "@/modules/asks/components/forms/create-ask-form/CreateAskForm";
import { PlusIcon } from "lucide-react";

interface CreateAskDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  onCancel: () => void;
}

const defaultTrigger = (
  <Button variant="outline">
    <PlusIcon />
    Додати запит
  </Button>
);

export function CreateAskDialogView({
  open,
  setOpen,
  trigger,
  onSuccess,
  onCancel,
}: CreateAskDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Створити новий запит
          </DialogTitle>
        </DialogHeader>
        <CreateAskForm onSuccess={onSuccess} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}
