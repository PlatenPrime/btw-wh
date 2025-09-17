import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputQuant } from "@/components/ui/input-quant";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import type { PosResponse } from "@/modules/poses/api/types";
import type { AskPosEditFormData } from "./schema";

interface AskPosEditFormViewProps {
  form: ReturnType<typeof useFormContext<AskPosEditFormData>>;
  pos: PosResponse;
  remainingQuant: number;
  remainingBoxes: number;
  onRemovedQuantChange: (value: string) => void;
  onRemovedBoxesChange: (value: string) => void;
  isSubmitting: boolean;
  onSubmit: (data: AskPosEditFormData) => void;
  onCancel?: () => void;
}

export function AskPosEditFormView({
  form,
  pos,
  remainingQuant,
  remainingBoxes,
  onRemovedQuantChange,
  onRemovedBoxesChange,
  isSubmitting,
  onSubmit,
  onCancel,
}: AskPosEditFormViewProps) {
  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const removedQuantValue = watch("removedQuant");
  const removedBoxesValue = watch("removedBoxes");

  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4">
            {/* Информация о текущих остатках */}
            <div className="grid gap-2 p-3 bg-muted/50 rounded-lg">
              <Label className="text-sm font-medium">Текущие остатки:</Label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Товар:</span> {pos.quant} шт.
                </div>
                <div>
                  <span className="text-muted-foreground">Коробки:</span> {pos.boxes} шт.
                </div>
              </div>
            </div>

            {/* Поля для ввода убранного количества */}
            <InputQuant
              id="removedQuant"
              label="Убрано товара"
              placeholder="Введите количество"
              value={removedQuantValue || ""}
              onValueChange={onRemovedQuantChange}
              error={errors.removedQuant?.message}
              required
              disabled={isSubmitting}
            />

            <InputQuant
              id="removedBoxes"
              label="Убрано коробок"
              placeholder="Введите количество коробок"
              value={removedBoxesValue || ""}
              onValueChange={onRemovedBoxesChange}
              error={errors.removedBoxes?.message}
              required
              disabled={isSubmitting}
            />

            {/* Отображение остатков после операции */}
            <div className="grid gap-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <Label className="text-sm font-medium text-green-700 dark:text-green-300">
                Останется после операции:
              </Label>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className={remainingQuant < 0 ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-green-300"}>
                  <span className="text-muted-foreground">Товар:</span> {remainingQuant} шт.
                </div>
                <div className={remainingBoxes < 0 ? "text-red-600 dark:text-red-400" : "text-green-700 dark:text-green-300"}>
                  <span className="text-muted-foreground">Коробки:</span> {remainingBoxes} шт.
                </div>
              </div>
              {(remainingQuant < 0 || remainingBoxes < 0) && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                  Внимание: Нельзя убрать больше, чем есть в наличии!
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="submit"
              disabled={isSubmitting || remainingQuant < 0 || remainingBoxes < 0}
              className="flex-1"
            >
              {isSubmitting ? "Обновляю..." : "Подтвердить"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Отмена
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
