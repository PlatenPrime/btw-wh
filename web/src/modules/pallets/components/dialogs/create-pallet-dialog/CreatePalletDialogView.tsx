import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type PalletFormValues } from "@/modules/pallets/components/forms/schema";
import { CreatePalletFormView } from "@/modules/pallets/components/forms/create-pallet-form/CreatePalletFormView";
import type { UseFormReturn } from "react-hook-form";

interface CreatePalletDialogViewProps {
  form: UseFormReturn<PalletFormValues>;
  isSubmitting: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onCancel: () => void;
}

export function CreatePalletDialogView({
  form,
  isSubmitting,
  onSubmit,
  onCancel,
}: CreatePalletDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Додати палету</DialogTitle>
        <DialogDescription>
          Введіть назву для нової палети
        </DialogDescription>
      </DialogHeader>
      <CreatePalletFormView
        form={form}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </DialogContent>
  );
}
