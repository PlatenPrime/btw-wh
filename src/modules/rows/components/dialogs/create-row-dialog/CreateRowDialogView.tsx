import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateRowForm } from "@/modules/rows/components/forms/create-row-form/CreateRowForm";

interface CreateRowDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  onCancel: () => void;
}

const defaultTrigger = <Button variant="default">Створити</Button>;

export function CreateRowDialogView({
  open,
  setOpen,
  trigger,
  onSuccess,
  onCancel,
}: CreateRowDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Створити</DialogTitle>
        </DialogHeader>
        <CreateRowForm onSuccess={onSuccess} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}
