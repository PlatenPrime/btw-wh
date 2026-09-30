import { Button } from "@/components/ui/button";
import { useStartApiTask } from "@/modules/apitasks";
import { Edit, Plus, RefreshCw, Save, X } from "lucide-react";

interface SegmentControlPanelProps {
  isEditMode: boolean;
  onCreate: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function SegmentControlPanel({
  isEditMode,
  onCreate,
  onEdit,
  onCancel,
  onSave,
  isSaving = false,
}: SegmentControlPanelProps) {
  const { startTask, isStarting } = useStartApiTask();

  const handleRecalculate = () => {
    void startTask({
      kind: "blocks.recalculate-zones-sectors",
      params: {},
      title: "Перерахунок секторів зон",
    });
  };

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
        <Button
          onClick={handleRecalculate}
          variant="outline"
          disabled={isStarting || isSaving}
        >
          <RefreshCw
            className={`mr-2 size-4 ${isStarting ? "animate-spin" : ""}`}
          />
          {isStarting ? "Перерахунок..." : "Перерахувати сектора"}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-2 md:flex">
      <Button onClick={onCreate}>
        <Plus className="size-4" />
        Додати сегмент
      </Button>
      <Button onClick={onEdit} variant="outline">
        <Edit className="size-4" />
        Редагувати
      </Button>
      <Button
        onClick={handleRecalculate}
        variant="outline"
        disabled={isStarting}
      >
        <RefreshCw className={`size-4 ${isStarting ? "animate-spin" : ""}`} />
        {isStarting ? "Перерахунок..." : "Перерахувати сектора"}
      </Button>
    </div>
  );
}
