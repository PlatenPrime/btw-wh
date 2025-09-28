import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calculator, Clock } from "lucide-react";

interface CalculationConfirmationDialogViewProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
}

export function CalculationConfirmationDialogView({
  isOpen,
  onClose,
  onConfirm,
  isPending,
}: CalculationConfirmationDialogViewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Запуск расчета дефицитов
          </DialogTitle>
          <DialogDescription>
            Расчет дефицитов может занять несколько минут. Процесс будет
            выполняться в фоновом режиме, и вы сможете отслеживать прогресс в
            реальном времени.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted flex items-center gap-2 rounded-lg p-4">
          <Clock className="text-muted-foreground h-4 w-4" />
          <span className="text-muted-foreground text-sm">
            Ожидаемое время выполнения: 2-5 минут
          </span>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Отмена
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isPending}
            className="min-w-[120px]"
          >
            {isPending ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Запуск...
              </>
            ) : (
              "Запустить расчет"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
