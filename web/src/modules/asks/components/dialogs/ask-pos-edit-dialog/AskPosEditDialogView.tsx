import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AskPosEditForm } from "@/modules/asks/components/forms/ask-pos-edit-form/AskPosEditForm.tsx";
import type { PosResponse } from "@/modules/poses/api/types";

interface AskPosEditDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  pos: PosResponse;
  askId: string;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  onCancel: () => void;
}

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
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {pos.palletData?.title}
          </DialogTitle>
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
