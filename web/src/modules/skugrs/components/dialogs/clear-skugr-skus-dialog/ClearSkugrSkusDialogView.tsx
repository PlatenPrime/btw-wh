import { DialogActions } from "@/components/shared/dialogs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

export interface ClearSkugrSkusDialogViewProps {
  skugrTitle: string;
  isClearing: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ClearSkugrSkusDialogView({
  skugrTitle,
  isClearing,
  onConfirm,
  onCancel,
}: ClearSkugrSkusDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[440px]">
      <DialogHeader>
        <DialogTitle>Очистити групу від товарів</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Небезпечна дія</AlertTitle>
          <AlertDescription>
            З групи <strong>{skugrTitle}</strong> зникнуть усі товари в складі.
            Самі картки товарів залишаться — зміниться лише ця група. Після
            очищення її можна знову заповнити через «Заповнити товарами».
          </AlertDescription>
        </Alert>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onConfirm}
          isSubmitting={isClearing}
          submitText="Очистити"
          submitLoadingText="Очищення..."
          variant="destructive"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
