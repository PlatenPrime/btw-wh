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

export function CreateRowDialogView({
  open,
  setOpen,
  trigger,
  onSuccess,
  onCancel,
}: CreateRowDialogViewProps) {
  const content = (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Створити ряд</DialogTitle>
      </DialogHeader>
      <CreateRowForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== undefined ? (
        <>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          {content}
        </>
      ) : (
        content
      )}
    </Dialog>
  );
}
