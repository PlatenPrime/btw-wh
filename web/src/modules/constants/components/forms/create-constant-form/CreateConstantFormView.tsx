import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyValueEditor } from "@/modules/constants/components/forms/key-value-editor";
import type { CreateConstantFormValues } from "@/modules/constants/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";

interface CreateConstantFormViewProps {
  form: UseFormReturn<CreateConstantFormValues>;
  onSubmit: (data: CreateConstantFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function CreateConstantFormView({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
}: CreateConstantFormViewProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Ключ (name)</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="my-constant"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="title">Назва</Label>
          <Input
            id="title"
            {...register("title")}
            placeholder="Назва колекції значень"
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-destructive text-sm">{errors.title.message}</p>
          )}
        </div>
        <KeyValueEditor<CreateConstantFormValues>
          control={control}
          name="dataEntries"
          disabled={isLoading}
        />
      </div>

      {errors.root && (
        <p className="text-destructive text-sm">{errors.root.message}</p>
      )}

      <DialogActions
        onCancel={onCancel}
        onSubmit={handleSubmit(onSubmit)}
        isSubmitting={isLoading}
        submitText="Створити"
      />
    </form>
  );
}
