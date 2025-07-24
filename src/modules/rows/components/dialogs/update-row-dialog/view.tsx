import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { UpdateRowForm } from "../..";

interface UpdateRowDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  row: RowDto;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  onCancel: () => void;
}

const defaultTrigger = <Button variant="outline">Редагувати</Button>;

export function UpdateRowDialogView({
  open,
  setOpen,
  row,
  trigger,
  onSuccess,
  onCancel,
}: UpdateRowDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle> Редагувати </DialogTitle>
        </DialogHeader>
        <UpdateRowForm row={row} onSuccess={onSuccess} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}
