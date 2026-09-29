import { DialogActions } from "@/components/shared/dialogs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { typography } from "@/lib/typography";
import { AlertTriangle } from "lucide-react";

export interface RunSkugrSlicesTodayDialogViewProps {
  skugrTitle: string;
  isRunning: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function RunSkugrSlicesTodayDialogView({
  skugrTitle,
  isRunning,
  onConfirm,
  onCancel,
}: RunSkugrSlicesTodayDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Провести зрізи на сьогодні</DialogTitle>
        <DialogDescription>
          Серверний scrape усіх SKU групи за поточний календарний день
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <Alert>
          <AlertTriangle />
          <AlertTitle>Повний перезапис</AlertTitle>
          <AlertDescription>
            Точки зрізу групи <strong>{skugrTitle}</strong> за сьогодні будуть
            перезаписані (включно з уже заповненими). Запит синхронний і може
            тривати кілька хвилин при великій групі.
          </AlertDescription>
        </Alert>
        <p className={typography.pageDescription}>
          Не плутати з компенсуючим зрізом (лише значення -1) і з Air
          client-ingest.
        </p>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onConfirm}
          isSubmitting={isRunning}
          submitText="Запустити"
          submitLoadingText="Збір зрізів..."
          variant="default"
          className="justify-end"
        />
      </div>
    </DialogContent>
  );
}
