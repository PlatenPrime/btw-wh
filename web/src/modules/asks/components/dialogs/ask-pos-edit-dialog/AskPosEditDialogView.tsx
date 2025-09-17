import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { PosResponse } from "@/modules/poses/api/types";
import { AskPosEditForm } from "@/modules/asks/components/forms/ask-pos-edit-form/AskPosEditForm.tsx";

interface AskPosEditDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pos: PosResponse;
  askId: string;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  onCancel: () => void;
}

const defaultTrigger = (
  <Button variant="outline" size="sm">
    Редактировать
  </Button>
);

export function AskPosEditDialogView({
  open,
  setOpen,
  pos,
  askId,
  trigger,
  onSuccess,
  onCancel,
}: AskPosEditDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{pos.artikul}</DialogTitle>
        </DialogHeader>
        <AskPosEditForm 
          pos={pos} 
          askId={askId}
          onSuccess={onSuccess} 
          onCancel={onCancel} 
        />
      </DialogContent>
    </Dialog>
  );
}
