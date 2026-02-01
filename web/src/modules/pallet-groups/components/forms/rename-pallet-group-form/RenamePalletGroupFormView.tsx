import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RenamePalletGroupFormViewProps {
  title: string;
  onTitleChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
  isSubmitDisabled: boolean;
}

export function RenamePalletGroupFormView({
  title,
  onTitleChange,
  onSubmit,
  onCancel,
  isSubmitting,
  isSubmitDisabled,
}: RenamePalletGroupFormViewProps) {
  return (
    <div className="grid gap-3">
      <div className="grid gap-1">
        <Label htmlFor="rename-pallet-group-title">Нова назва групи</Label>
        <Input
          id="rename-pallet-group-title"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          disabled={isSubmitting}
        />
      </div>
      <DialogActions
        onCancel={onCancel}
        onSubmit={onSubmit}
        cancelText="Скасувати"
        submitText="Зберегти"
        isSubmitting={isSubmitting}
        isDisabled={isSubmitDisabled}
      />
    </div>
  );
}
