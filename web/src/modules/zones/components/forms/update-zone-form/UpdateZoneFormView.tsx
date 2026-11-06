import { DialogActions } from "@/components/shared/dialogs";
import { Input } from "@/components/ui/input";
import { InputNumeric } from "@/components/ui/input-numeric";
import { Label } from "@/components/ui/label";
import { typography } from "@/lib/typography";
import type { UpdateZoneFormValues } from "@/modules/zones/components/forms/schema";
import { Controller, type UseFormReturn } from "react-hook-form";

interface UpdateZoneFormViewProps {
  form: UseFormReturn<UpdateZoneFormValues>;
  onSubmit: (data: UpdateZoneFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function UpdateZoneFormView({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
}: UpdateZoneFormViewProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="title">Назва зони</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="42-5-2"
          disabled={isLoading}
        />
        {errors.title && (
          <p className={typography.formError}>{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bar">Штрихкод</Label>
        <Controller
          control={control}
          name="bar"
          render={({ field }) => (
            <InputNumeric
              id="bar"
              value={field.value ?? ""}
              onNumberChange={(next) => field.onChange(next)}
              onBlur={field.onBlur}
              placeholder="420502"
              disabled={isLoading}
            />
          )}
        />
        {errors.bar && (
          <p className={typography.formError}>{errors.bar.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sector">Сектор</Label>
        <Controller
          control={control}
          name="sector"
          render={({ field }) => (
            <InputNumeric
              id="sector"
              value={field.value ?? ""}
              onNumberChange={(next) => field.onChange(next)}
              onBlur={field.onBlur}
              placeholder="0"
              disabled={isLoading}
            />
          )}
        />
        {errors.sector && (
          <p className={typography.formError}>{errors.sector.message}</p>
        )}
      </div>

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isLoading}
        submitText="Оновити"
      />
    </form>
  );
}
