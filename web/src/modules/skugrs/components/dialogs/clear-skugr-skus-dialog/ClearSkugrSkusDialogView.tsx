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
            Усі прив&apos;язки SKU до групи <strong>{skugrTitle}</strong> будуть
            видалені з масиву складу групи. Документи товарів у колекції{" "}
            <code className="text-xs">skus</code> залишаться; зміниться лише
            склад цієї групи. Після очищення можна знову заповнити групу
            (наприклад, через «Заповнити товарами»).
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
