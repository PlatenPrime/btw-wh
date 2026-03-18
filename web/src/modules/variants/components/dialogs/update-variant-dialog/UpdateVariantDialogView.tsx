import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { VariantDto } from "@/modules/variants/api/types";
import { UpdateVariantForm } from "@/modules/variants/components/forms/update-variant-form/UpdateVariantForm";

interface UpdateVariantDialogViewProps {
  variant: VariantDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateVariantDialogView({
  variant,
  onSuccess,
  onCancel,
}: UpdateVariantDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Редагувати варіант</DialogTitle>
      </DialogHeader>
      <UpdateVariantForm
        variant={variant}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </DialogContent>
  );
}

