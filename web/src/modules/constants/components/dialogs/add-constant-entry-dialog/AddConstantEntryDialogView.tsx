import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AddConstantEntryFormValues } from "@/modules/constants/components/forms/schema";
import type { UseFormReturn } from "react-hook-form";

interface AddConstantEntryDialogViewProps {
  form: UseFormReturn<AddConstantEntryFormValues>;
  onSubmit: (values: AddConstantEntryFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function AddConstantEntryDialogView({
  form,
  onSubmit,
  onCancel,
  isSubmitting,
}: AddConstantEntryDialogViewProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Додати пару</DialogTitle>
      </DialogHeader>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-4"
      >
        <div className="grid gap-2">
          <Label htmlFor="add-entry-key">Ключ</Label>
          <Input
            id="add-entry-key"
            placeholder="Ключ"
            disabled={isSubmitting}
            {...register("key")}
          />
          {errors.key && (
            <p className="text-destructive text-sm">{errors.key.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="add-entry-value">Значення</Label>
          <Input
            id="add-entry-value"
            placeholder="Значення"
            disabled={isSubmitting}
            {...register("value")}
          />
          {errors.value && (
            <p className="text-destructive text-sm">{errors.value.message}</p>
          )}
        </div>

        {errors.root && (
          <p className="text-destructive text-sm">{errors.root.message}</p>
        )}

        <DialogActions
          onCancel={onCancel}
          onSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          submitText="Додати"
        />
      </form>
    </DialogContent>
  );
}

