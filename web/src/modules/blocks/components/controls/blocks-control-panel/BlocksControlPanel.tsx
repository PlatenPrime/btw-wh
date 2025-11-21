import { Button } from "@/components/ui/button";
import { Edit, Plus, Save, X } from "lucide-react";

interface BlocksControlPanelProps {
  isEditMode: boolean;
  onCreate: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function BlocksControlPanel({
  isEditMode,
  onCreate,
  onEdit,
  onCancel,
  onSave,
  isSaving = false,
}: BlocksControlPanelProps) {
  if (isEditMode) {
    return (
      <div className="flex gap-2">
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

  return (
    <div className="flex gap-2">
      <Button onClick={onCreate}>
        <Plus className="mr-2 size-4" />
        Створити блок
      </Button>
      <Button onClick={onEdit} variant="outline">
        <Edit className="mr-2 size-4" />
        Редагувати
      </Button>
    </div>
  );
}

