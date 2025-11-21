import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateBlockFormValues } from "@/modules/blocks/components/forms/create-block-form/schema";
import type { UseFormReturn } from "react-hook-form";

interface CreateBlockFormViewProps {
  form: UseFormReturn<CreateBlockFormValues>;
  onSubmit: (data: CreateBlockFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function CreateBlockFormView({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
}: CreateBlockFormViewProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Назва блоку</Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Block A"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title.message}</p>
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

