import { DialogActions } from "@/components/shared/dialogs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

export interface PurgePromotedFromNewskuDialogViewProps {
  isPurging: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function PurgePromotedFromNewskuDialogView({
  isPurging,
  onConfirm,
  onCancel,
}: PurgePromotedFromNewskuDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[440px]">
      <DialogHeader>
        <DialogTitle>Очистити Новинки від дублікатів</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Небезпечна дія</AlertTitle>
          <AlertDescription>
            З усіх груп «Новинки» будуть прибрані товари, яким уже призначено
            іншого виробника. Картки товарів не видаляються — у Новинках
            залишаться лише ще не розподілені.
          </AlertDescription>
        </Alert>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onConfirm}
          isSubmitting={isPurging}
          submitText="Очистити"
          submitLoadingText="Очищення..."
          variant="destructive"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
