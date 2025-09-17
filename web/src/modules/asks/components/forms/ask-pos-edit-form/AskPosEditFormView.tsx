import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputQuant } from "@/components/ui/input-quant";
import { Label } from "@/components/ui/label";
import type { PosResponse } from "@/modules/poses/api/types";
import { useFormContext } from "react-hook-form";
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
            <div className="bg-muted/50 grid gap-2 rounded-lg p-3">
              <Label className="text-sm font-medium">Поточні залишки:</Label>
              <div className="grid gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Товар:</span>{" "}
                  {pos.quant} шт.
                </div>
                <div>
                  <span className="text-muted-foreground">Коробки:</span>{" "}
                  {pos.boxes} шт.
                </div>
              </div>
            </div>

            {/* Поля для ввода убранного количества */}
            <InputQuant
              id="removedQuant"
              label="Знято товару "
              placeholder="Введіть кількість (може бути від'ємним)"
              value={removedQuantValue || ""}
              onValueChange={onRemovedQuantChange}
              error={errors.removedQuant?.message}
              required
              disabled={isSubmitting}
            />

            <InputQuant
              id="removedBoxes"
              label="Знято коробок "
              placeholder="Введіть кількість коробок (може бути від'ємним)"
              value={removedBoxesValue || ""}
              onValueChange={onRemovedBoxesChange}
              error={errors.removedBoxes?.message}
              required
              disabled={isSubmitting}
            />

            {/* Отображение остатков после операции */}
            <div
              className={`grid gap-2 rounded-lg border p-3 ${
                remainingQuant < 0 || remainingBoxes < 0
                  ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
                  : "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
              }`}
            >
              <Label
                className={`text-sm font-medium ${
                  remainingQuant < 0 || remainingBoxes < 0
                    ? "text-red-700 dark:text-red-300"
                    : "text-green-700 dark:text-green-300"
                }`}
              >
                {remainingQuant < 0 || remainingBoxes < 0
                  ? "Попередження: Недостатньо товару!"
                  : "Залишиться після операції:"}
              </Label>
              <div className="grid gap-2 text-sm">
                <div
                  className={
                    remainingQuant < 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-700 dark:text-green-300"
                  }
                >
                  <span className="text-muted-foreground">Товар:</span>{" "}
                  {remainingQuant} шт.
                </div>
                <div
                  className={
                    remainingBoxes < 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-green-700 dark:text-green-300"
                  }
                >
                  <span className="text-muted-foreground">Коробки:</span>{" "}
                  {remainingBoxes} шт.
                </div>
              </div>
              {(remainingQuant < 0 || remainingBoxes < 0) && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                  Увага: Не можна зняти більше, ніж є в наявності!
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Button
              type="submit"
              disabled={
                isSubmitting || remainingQuant < 0 || remainingBoxes < 0
              }
              className="flex-1"
            >
              {isSubmitting ? "Оновлюю..." : "Підтвердити"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Скасувати
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
