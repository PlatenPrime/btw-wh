import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ConstantDto } from "@/modules/constants/api/types";
import { UpdateConstantForm } from "@/modules/constants/components/forms/update-constant-form";

interface UpdateConstantDialogViewProps {
  constant: ConstantDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateConstantDialogView({
  constant,
  onSuccess,
  onCancel,
}: UpdateConstantDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Редагувати константу</DialogTitle>
      </DialogHeader>
      <UpdateConstantForm
        constant={constant}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </DialogContent>
  );
}
