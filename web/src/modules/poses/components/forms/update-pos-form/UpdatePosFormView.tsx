import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { InputQuant } from "@/components/ui/input-quant";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sklads, type ISklads } from "@/constants/sklad";
import { useFormContext } from "react-hook-form";
import type { UpdatePosFormData } from "./schema";

interface UpdatePosFormViewProps {
  form: ReturnType<typeof useFormContext<UpdatePosFormData>>;
  artikul: string;
  onQuantChange: (value: string) => void;
  onBoxesChange: (value: string) => void;
  isSubmitting: boolean;
  onSubmit: (data: UpdatePosFormData) => void;
  onCancel?: () => void;
}

export function UpdatePosFormView({
  form,
  artikul,
  onQuantChange,
  onBoxesChange,
  isSubmitting,
  onSubmit,
  onCancel,
}: UpdatePosFormViewProps) {
  const {
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const quantValue = watch("quant");
  const boxesValue = watch("boxes");

  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4">
            <InputQuant
              id="quant"
              label="Кількість"
              placeholder="Введіть кількість"
              value={quantValue || ""}
              onValueChange={onQuantChange}
              error={errors.quant?.message}
              required
              disabled={isSubmitting}
            />

            <InputQuant
              id="boxes"
              label="Коробки"
              placeholder="Введіть кількість коробок"
              value={boxesValue || ""}
              onValueChange={onBoxesChange}
              error={errors.boxes?.message}
              required
              disabled={isSubmitting}
            />

            <div className="grid gap-2">
              <Label htmlFor="sklad">Склад</Label>
              <Select
                value={form.watch("sklad")}
                onValueChange={(value) => form.setValue("sklad", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={sklads[form.watch("sklad") as keyof ISklads]}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pogrebi">{sklads.pogrebi}</SelectItem>
                  <SelectItem value="merezhi">{sklads.merezhi}</SelectItem>
                </SelectContent>
              </Select>
              {errors.sklad && (
                <p className="text-destructive text-sm">
                  {errors.sklad.message}
                </p>
              )}
            </div>
          </div>

          {onCancel ? (
            <DialogActions
              onCancel={onCancel}
              onSubmit={handleSubmit(onSubmit)}
              cancelText="Скасувати"
              submitText="Оновити"
              isSubmitting={isSubmitting}
              isDisabled={!artikul.trim()}
              className="w-full"
            />
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || !artikul.trim()}
              className="w-full"
            >
              {isSubmitting ? "Оновлюю..." : "Оновити"}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
