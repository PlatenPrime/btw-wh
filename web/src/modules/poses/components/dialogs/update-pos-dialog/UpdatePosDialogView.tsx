import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IPos } from "@/modules/poses/api/types";
import { UpdatePosForm } from "@/modules/poses/components/forms/update-pos-form/UpdatePosForm.tsx";
import type { Dispatch, SetStateAction } from "react";

interface UpdatePosDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pos: IPos;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdatePosDialogView({
  open,
  setOpen,
  pos,
  trigger,
  onSuccess,
  onCancel,
}: UpdatePosDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{pos.artikul}</DialogTitle>
        </DialogHeader>
        <UpdatePosForm
          pos={pos}
          onSuccess={onSuccess}
          onCancel={onCancel}
          isDialogOpen={open}
        />
      </DialogContent>
    </Dialog>
  );
}
