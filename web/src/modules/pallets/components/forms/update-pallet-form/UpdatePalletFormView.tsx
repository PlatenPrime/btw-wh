import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UseFormReturn } from "react-hook-form";
import { type PalletFormValues } from "../schema";

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
    formState: { errors },
  } = form;

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

          {errors.root && (
            <div className="text-destructive text-sm">
              {errors.root.message}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Оновлюю..." : "Оновити"}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="destructive"
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
