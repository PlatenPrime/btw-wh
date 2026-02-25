import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ConstantEntry {
  key: string;
  value: string;
}

interface EditConstantEntryDialogViewProps {
  entry: ConstantEntry;
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function EditConstantEntryDialogView({
  entry,
  value,
  onValueChange,
  onSubmit,
  onCancel,
  isSubmitting,
}: EditConstantEntryDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Редагувати запис</DialogTitle>
      </DialogHeader>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="edit-entry-key">Ключ</Label>
          <Input
            id="edit-entry-key"
            value={entry.key}
            readOnly
            className="bg-muted"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="edit-entry-value">Значення</Label>
          <Input
            id="edit-entry-value"
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="Значення"
            disabled={isSubmitting}
          />
        </div>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          submitText="Зберегти"
        />
      </form>
    </DialogContent>
  );
}
