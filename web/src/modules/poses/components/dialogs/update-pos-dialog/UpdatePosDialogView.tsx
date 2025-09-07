import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IPos } from "@/modules/poses/api/types";
import { UpdatePosForm } from "../../forms/update-pos-form/UpdatePosForm";

interface UpdatePosDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pos: IPos;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  onCancel: () => void;
}

const defaultTrigger = (
  <Button variant="outline" size="sm">
    Редагувати
  </Button>
);

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
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{pos.artikul}</DialogTitle>
        </DialogHeader>
        <UpdatePosForm pos={pos} onSuccess={onSuccess} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}
