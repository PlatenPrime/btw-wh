import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

import { CreateRowForm } from "@/modules/rows/components/forms/create-row-form";

interface CreateRowDialogProps {
  trigger?: React.ReactNode;
  onSuccess: () => void;
}

export function CreateRowDialog({ trigger, onSuccess }: CreateRowDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const defaultTrigger = <Button variant={"default"}>{"Створити"}</Button>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{"Створити"}</DialogTitle>
        </DialogHeader>
        <CreateRowForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  );
}
