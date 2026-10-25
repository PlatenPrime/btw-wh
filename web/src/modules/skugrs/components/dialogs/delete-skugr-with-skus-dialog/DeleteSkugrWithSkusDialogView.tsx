import { DialogActions } from "@/components/shared/dialogs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

export interface DeleteSkugrWithSkusDialogViewProps {
  skugrTitle: string;
  isDeleting: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export function DeleteSkugrWithSkusDialogView({
  skugrTitle,
  isDeleting,
  onDelete,
  onCancel,
}: DeleteSkugrWithSkusDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Видалити групу разом з товарами</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Небезпечна дія</AlertTitle>
          <AlertDescription>
            Буде видалено групу <strong>{skugrTitle}</strong> і{" "}
            <strong>усі</strong> товари з її складу. Якщо ті самі товари ще є в
            інших групах — їх приберуть і звідти, а картки товарів видалять.
            Цю дію неможливо скасувати.
          </AlertDescription>
        </Alert>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onDelete}
          isSubmitting={isDeleting}
          submitText="Видалити групу та товари"
          submitLoadingText="Видалення..."
          variant="destructive"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
