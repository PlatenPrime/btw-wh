import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateZoneFormValues } from "@/modules/zones/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";

interface CreateZoneFormViewProps {
  form: UseFormReturn<CreateZoneFormValues>;
  onSubmit: (data: CreateZoneFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function CreateZoneFormView({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
}: CreateZoneFormViewProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Назва зони</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="42-5-2"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="bar">Штрих-код</Label>
        <Input
          id="bar"
          type="number"
          {...register("bar", { valueAsNumber: true })}
          placeholder="420502"
          disabled={isLoading}
        />
        {errors.bar && (
          <p className="text-destructive text-sm">{errors.bar.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sector">Сектор</Label>
        <Input
          id="sector"
          type="number"
          {...register("sector", { valueAsNumber: true })}
          placeholder="0"
          disabled={isLoading}
        />
        {errors.sector && (
          <p className="text-destructive text-sm">{errors.sector.message}</p>
        )}
      </div>

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isLoading}
        submitText="Створити"
      />
    </form>
  );
}
