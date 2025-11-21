import { Button } from "@/components/ui/button";
import { Edit, Plus, Save, X } from "lucide-react";

interface BlockControlPanelProps {
  isEditMode: boolean;
  onAddZones: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function BlockControlPanel({
  isEditMode,
  onAddZones,
  onEdit,
  onCancel,
  onSave,
  isSaving = false,
}: BlockControlPanelProps) {
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
      <Button onClick={onAddZones}>
        <Plus className="mr-2 size-4" />
        Додати зони
      </Button>
      <Button onClick={onEdit} variant="outline">
        <Edit className="mr-2 size-4" />
        Редагувати
      </Button>
    </div>
  );
}

