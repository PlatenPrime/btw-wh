import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  FieldErrorDisplay,
  FormErrorDisplay,
} from "@/components/shared/error-components";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { type PalletFormValues } from "@/modules/pallets/components/forms/schema";
import { Plus } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

interface CreatePalletDialogViewProps {
  form: UseFormReturn<PalletFormValues>;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreatePalletDialogView({
  form,
  isSubmitting,
  onSubmit,
  open,
  onOpenChange,
}: CreatePalletDialogViewProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const isDefValue = watch("isDef");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Додати палету
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Додати палету</DialogTitle>
          <DialogDescription>
            Введіть назву та (опціонально) сектор для нової палети
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4" noValidate>
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label htmlFor="pallet-sector" className="text-sm font-medium">
              Сектор (опціонально)
            </Label>
            <Input
              id="pallet-sector"
              placeholder="Введіть сектор"
              {...register("sector")}
              disabled={isSubmitting}
            />
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
            onCancel={() => onOpenChange(false)}
            onSubmit={onSubmit}
            cancelText="Скасувати"
            submitText="Додати"
            isSubmitting={isSubmitting}
            className="w-full"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
