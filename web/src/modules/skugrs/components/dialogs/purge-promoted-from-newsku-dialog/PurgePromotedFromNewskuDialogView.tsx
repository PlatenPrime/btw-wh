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
            З усіх товарних груп з виробником <strong>newsku</strong>{" "}
            (Новинки) будуть прибрані посилання на SKU, у яких уже інший{" "}
            <code className="text-xs">prodName</code>. Документи товарів у
            колекції <code className="text-xs">skus</code> не видаляються і не
            змінюються — у групах Новинок залишаться лише ще не присвоєні
            картки.
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
