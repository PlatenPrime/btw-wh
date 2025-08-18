import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { type PalletFormValues } from "../../forms/schema";

interface CreatePalletDialogViewProps {
  form: UseFormReturn<PalletFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: PalletFormValues) => Promise<boolean>;
}

export function CreatePalletDialogView({
  form,
  isSubmitting,
  onSubmit,
}: CreatePalletDialogViewProps) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const handleFormSubmit = handleSubmit(async (data) => {
    const success = await onSubmit(data);
    if (success) {
      setOpen(false);
      reset();
    }
  });

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      reset();
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
        <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
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
            {errors.title && (
              <span id="title-error" className="block text-sm text-red-600">
                {errors.title.message}
              </span>
            )}
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
          {errors.root && (
            <div className="text-destructive text-sm">
              {errors.root.message}
            </div>
          )}
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Додається..." : "Додати"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Скасувати
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
