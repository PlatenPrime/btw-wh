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
import type { IPullPosition } from "@/modules/pulls/api/types/dto";
import { useState } from "react";
import { toast } from "sonner";

interface ProcessPositionDialogViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: IPullPosition;
  onProcess: (actualQuant: number, actualBoxes: number) => void;
  isProcessing: boolean;
}

export function ProcessPositionDialogView({
  open,
  onOpenChange,
  position,
  onProcess,
  isProcessing,
}: ProcessPositionDialogViewProps) {
  const [actualQuant, setActualQuant] = useState(
    position.requestedQuant > 0 ? position.requestedQuant : 1,
  );
  const [actualBoxes, setActualBoxes] = useState(0);

  const handleSubmit = () => {
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
          <DialogTitle>Обробити позицію</DialogTitle>
          <DialogDescription>
            Вкажіть кількість товару для вилучення
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-start gap-3">
            <ArtDialogImage artikul={position.artikul} />
            <div className="grid flex-1 gap-2">
              {position.nameukr && (
                <div className="text-base font-medium">{position.nameukr}</div>
              )}
              <div className="text-muted-foreground text-sm">
                {position.artikul}
              </div>
              <div className="grid gap-1 border-t pt-2">
                <div className="text-muted-foreground text-sm">
                  Доступно:{" "}
                  <strong>
                    {position.currentQuant} шт. / {position.currentBoxes} кор.
                  </strong>
                </div>
                {position.requestedQuant > 0 && (
                  <div className="text-muted-foreground text-sm">
                    Запитано: <strong>{position.requestedQuant}</strong>
                  </div>
                )}
                <div className="text-muted-foreground text-sm">
                  Запит від: <strong>{position.askerData.fullname}</strong>
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

        <DialogFooter>
          <DialogActions
            onCancel={() => onOpenChange(false)}
            onSubmit={handleSubmit}
            cancelText="Скасувати"
            submitText="Обробити"
            isSubmitting={isProcessing}
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
