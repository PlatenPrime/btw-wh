import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UpdateAllBtradeStocksDialogViewProps {
  isUpdating: boolean;
  onUpdate: () => Promise<void>;
  onCancel: () => void;
}

export function UpdateAllBtradeStocksDialogView({
  isUpdating,
  onUpdate,
  onCancel,
}: UpdateAllBtradeStocksDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Оновити залишки Btrade</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете запустити оновлення залишків Btrade для всіх
          артикулів? Процес виконується асинхронно і може зайняти тривалий час.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <p className="text-muted-foreground text-sm">
          Після підтвердження буде запущено процес оновлення залишків Btrade для
          всіх артикулів у системі. Оновлення виконується в фоновому режимі, і
          ви отримаєте сповіщення після запуску процесу.
        </p>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onUpdate}
          isSubmitting={isUpdating}
          submitText="Оновити"
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}

