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
            Запуск розрахунку дефіцитів
          </DialogTitle>
          <DialogDescription>
            Розрахунок дефіцитів може зайняти кілька хвилин. Процес буде
            виконуватися у фоновому режимі, і ви зможете відстежувати прогрес у
            реальному часі.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted flex items-center gap-2 rounded-lg p-4">
          <Clock className="text-muted-foreground h-4 w-4" />
          <span className="text-muted-foreground text-sm">
            Очікуваний час виконання: 6-8 хвилин
          </span>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Скасувати
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
              "Запустити"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
