import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type RowFormValues } from "@/modules/rows/components/forms/schema.ts";
import type { UseFormReturn } from "react-hook-form";

interface CreateRowFormViewProps {
  form: UseFormReturn<RowFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: RowFormValues) => void;
  onCancel?: () => void;
}

export function CreateRowFormView({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
}: CreateRowFormViewProps) {
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
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="title">Назва ряду</Label>
            <Input
              id="title"
              placeholder="XX-XX"
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
              submitText="Створити"
              isSubmitting={isSubmitting}
              className="w-full"
            />
          ) : (
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Створюю..." : "Створити"}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
