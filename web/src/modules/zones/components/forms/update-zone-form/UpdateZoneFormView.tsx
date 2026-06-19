import { DialogActions } from "@/components/shared/dialogs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UpdateZoneFormValues } from "@/modules/zones/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";
import { typography } from "@/lib/typography";

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
        <Input
          id="bar"
          type="number"
          {...register("bar", { valueAsNumber: true })}
          placeholder="420502"
          disabled={isLoading}
        />
        {errors.bar && (
          <p className={typography.formError}>{errors.bar.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="sector">Сектор</Label>
        <Input
          id="sector"
          type="number"
          {...register("sector", { valueAsNumber: true })}
          placeholder="0"
          disabled={isLoading}
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
