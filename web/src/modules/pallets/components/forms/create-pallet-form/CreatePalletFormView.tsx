import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  FieldErrorDisplay,
  FormErrorDisplay,
} from "@/components/shared/error-components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { type PalletFormValues } from "@/modules/pallets/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";

interface CreatePalletFormViewProps {
  form: UseFormReturn<PalletFormValues>;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onCancel: () => void;
}

export function CreatePalletFormView({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
}: CreatePalletFormViewProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const isDefValue = watch("isDef");

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-2">
        <Label htmlFor="pallet-title" className="text-sm font-medium">
          Назва палети *
        </Label>
        <Input
          id="pallet-title"
          placeholder="Введіть назву"
          autoFocus
          aria-invalid={!!errors.title}
          aria-describedby="title-error"
          {...register("title")}
          disabled={isSubmitting}
        />
        {errors.title && <FieldErrorDisplay error={errors.title.message} />}
      </div>
      <div className="flex items-center justify-between">
        <Label htmlFor="pallet-isDef" className="text-sm font-medium">
          Аналіз
        </Label>
        <Switch
          id="pallet-isDef"
          checked={isDefValue}
          onCheckedChange={(checked: boolean) => setValue("isDef", checked)}
          disabled={isSubmitting}
        />
      </div>
      {errors.root && (
        <FormErrorDisplay error={errors.root.message} variant="compact" />
      )}
      <DialogActions
        onCancel={onCancel}
        onSubmit={onSubmit}
        cancelText="Скасувати"
        submitText="Додати"
        isSubmitting={isSubmitting}
        className="w-full"
      />
    </form>
  );
}
