import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { type PalletFormValues } from "@/modules/pallets/components/forms/schema.ts";
import type { UseFormReturn } from "react-hook-form";

interface UpdatePalletFormViewProps {
  form: UseFormReturn<PalletFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: PalletFormValues) => void;
  onCancel?: () => void;
}

export function UpdatePalletFormView({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
}: UpdatePalletFormViewProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const isDefValue = watch("isDef");

  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4"
          noValidate
        >
          <div className="grid gap-2">
            <Label htmlFor="title">Назва палети</Label>
            <Input
              id="title"
              placeholder="Введіть назву палети"
              aria-invalid={!!errors.title}
              aria-describedby="title-error"
              {...register("title")}
              disabled={isSubmitting}
            />
            {errors.title && (
              <span id="title-error" className="block text-sm text-red-600">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="sector">Сектор</Label>
            <Input
              id="sector"
              placeholder="Введіть сектор (необов'язково)"
              {...register("sector")}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isDef">Аналіз</Label>
            <Switch
              id="isDef"
              checked={isDefValue}
              onCheckedChange={(checked: boolean) => setValue("isDef", checked)}
              disabled={isSubmitting}
            />
          </div>

          {errors.root && (
            <div className="text-destructive text-sm">
              {errors.root.message}
            </div>
          )}

          {onCancel ? (
            <DialogActions
              onCancel={onCancel}
              onSubmit={handleSubmit(onSubmit)}
              cancelText="Скасувати"
              submitText="Оновити"
              isSubmitting={isSubmitting}
              className="w-full"
            />
          ) : (
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Оновлюю..." : "Оновити"}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
