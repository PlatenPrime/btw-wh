import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowForm } from "@/modules/rows/components/forms/row-form";

interface RowDialogProps {
  row?: RowDto;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function RowDialog({ row, trigger, onSuccess }: RowDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    console.log("Row dialog success callback triggered");
    setOpen(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const defaultTrigger = (
    <Button variant={row ? "outline" : "default"}>
      {row ? "Редагувати" : "Створити"}
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{row ? "Редагувати" : "Створити"}</DialogTitle>
        </DialogHeader>
        <RowForm row={row} onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}
