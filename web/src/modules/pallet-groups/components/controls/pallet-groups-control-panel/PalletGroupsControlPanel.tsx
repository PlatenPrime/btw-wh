import { Button } from "@/components/ui/button";
import { Edit, Save, X } from "lucide-react";

interface PalletGroupsControlPanelProps {
  isEditMode: boolean;
  hasGroups: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function PalletGroupsControlPanel({
  isEditMode,
  hasGroups,
  onEdit,
  onCancel,
  onSave,
  isSaving = false,
}: PalletGroupsControlPanelProps) {
  if (isEditMode) {
    return (
      <div className="flex flex-wrap gap-2">
        <Button onClick={onCancel} variant="outline" disabled={isSaving}>
          <X className="mr-2 size-4" />
          Скасувати
        </Button>
        <Button onClick={onSave} disabled={isSaving}>
          <Save className="mr-2 size-4" />
          {isSaving ? "Збереження..." : "Зберегти"}
        </Button>
      </div>
    );
  }

  if (!hasGroups) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={onEdit} variant="outline">
        <Edit className="mr-2 size-4" />
        Редагувати порядок
      </Button>
    </div>
  );
}
