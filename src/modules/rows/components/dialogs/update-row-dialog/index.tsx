import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { UpdateRowForm } from "@/modules/rows/components/forms/update-row-form";
import { useState } from "react";

interface UpdateRowDialogProps {
  row: RowDto;
  trigger?: React.ReactNode;
  onSuccess: () => void;
}

export function UpdateRowDialog({
  row,
  trigger,
  onSuccess,
}: UpdateRowDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const defaultTrigger = <Button variant="outline">"Редагувати"</Button>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle> "Редагувати" </DialogTitle>
        </DialogHeader>
        <UpdateRowForm
          row={row}
          onSuccess={handleSuccess}
          onCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
