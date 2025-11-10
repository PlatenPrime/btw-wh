import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputQuant } from "@/components/ui/input-quant";
import { Label } from "@/components/ui/label";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import type { PullPosition } from "@/modules/pulls/api/types";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

interface ProcessPositionDialogViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: PullPosition | null;
  pullTitle: string;
  dialogTitle: string | null;
  onProcess: (actualQuant: number, actualBoxes: number) => void;
  isProcessing: boolean;
}

export function ProcessPositionDialogView({
  open,
  onOpenChange,
  position,
  pullTitle,
  dialogTitle,
  onProcess,
  isProcessing,
}: ProcessPositionDialogViewProps) {
  const [actualQuant, setActualQuant] = useState(1);
  const [actualBoxes, setActualBoxes] = useState(0);

  useEffect(() => {
    if (!position) {
      setActualQuant(1);
      setActualBoxes(0);
      return;
    }

    const defaultQuant = (() => {
      if (position.plannedQuant && position.plannedQuant > 0) {
        return position.plannedQuant;
      }

      if (
        position.totalRequestedQuant &&
        position.totalRequestedQuant > position.alreadyPulledQuant
      ) {
        return position.totalRequestedQuant - position.alreadyPulledQuant;
      }

      return 1;
    })();

    setActualQuant(Math.max(1, defaultQuant));
    setActualBoxes(0);
  }, [position]);

  const description = useMemo(() => {
    if (!position) {
      return "";
    }

    if (position.plannedQuant == null) {
      return "Заявка без жорсткої кількості. Вкажи, скільки фактично знято.";
    }

    return "Перевір фактичну кількість перед фіксацією.";
  }, [position]);

  const handleSubmit = () => {
    if (!position) {
      return;
    }

    if (actualQuant <= 0) {
      toast.error("Кількість повинна бути більше 0");
      return;
    }

    if (actualQuant > position.currentQuant) {
      toast.error(
        `Неможливо зняти більше, ніж доступно (${position.currentQuant})`,
      );
      return;
    }

    if (actualBoxes < 0) {
      toast.error("Кількість коробок не може бути від'ємною");
      return;
    }

    if (actualBoxes > position.currentBoxes) {
      toast.error(
        `Неможливо зняти більше коробок, ніж доступно (${position.currentBoxes})`,
      );
      return;
    }

    onProcess(actualQuant, actualBoxes);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle ?? "Обробити позицію"}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {position && (
          <div className="grid gap-4 py-4">
            <div className="flex items-start gap-3">
              <ArtDialogImage artikul={position.artikul} />
              <div className="grid flex-1 gap-2">
                <div className="text-base font-medium">{pullTitle}</div>
                {position.nameukr && (
                  <div className="text-sm text-muted-foreground">
                    {position.nameukr}
                  </div>
                )}
                <div className="text-muted-foreground text-sm">
                  {position.artikul}
                </div>
                <div className="grid gap-2 border-t pt-2 text-sm">
                  <div>
                    Доступно:{" "}
                    <strong>
                      {position.currentQuant} шт. / {position.currentBoxes} кор.
                    </strong>
                  </div>
                  {position.totalRequestedQuant != null && (
                    <div>
                      Запитано:{" "}
                      <strong>{position.totalRequestedQuant} шт.</strong>
                    </div>
                  )}
                  <div>
                    Знято:{" "}
                    <strong>
                      {position.alreadyPulledQuant} шт. /{" "}
                      {position.alreadyPulledBoxes} кор.
                    </strong>
                  </div>
                  <div>
                    Запит від:{" "}
                    <strong>{position.askerData.fullname}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="actualQuant">Кількість для вилучення</Label>
                <InputQuant
                  id="actualQuant"
                  value={actualQuant.toString()}
                  onValueChange={(value) => setActualQuant(Number(value) || 0)}
                  max={position.currentQuant}
                  min={1}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="actualBoxes">Кількість коробок</Label>
                <InputQuant
                  id="actualBoxes"
                  value={actualBoxes.toString()}
                  onValueChange={(value) => setActualBoxes(Number(value) || 0)}
                  max={position.currentBoxes}
                  min={0}
                />
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogActions
            onCancel={() => onOpenChange(false)}
            onSubmit={handleSubmit}
            cancelText="Скасувати"
            submitText="Зняти"
            isSubmitting={isProcessing}
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
