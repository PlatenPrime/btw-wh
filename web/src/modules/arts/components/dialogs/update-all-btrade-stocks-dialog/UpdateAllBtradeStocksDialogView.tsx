import { DialogActions } from "@/components/shared/dialogs";
import { typography } from "@/lib/typography";
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
          Оновити залишки Btrade для всіх артикулів? Робота йде у фоні і може
          зайняти тривалий час.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <p className={typography.pageDescription}>
          Після підтвердження оновлення стартує у фоні. Сповіщення прийде, коли
          процес буде запущено.
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

