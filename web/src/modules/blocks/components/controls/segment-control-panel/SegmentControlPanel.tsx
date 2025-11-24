import { Button } from "@/components/ui/button";
import { Edit, Plus, RefreshCw, Save, X } from "lucide-react";
import { useRecalculateZonesSectorsMutation } from "@/modules/blocks/api/hooks/mutations/useRecalculateZonesSectorsMutation";

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
  const recalculateMutation = useRecalculateZonesSectorsMutation();

  const handleRecalculate = () => {
    recalculateMutation.mutate();
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
          disabled={recalculateMutation.isPending || isSaving}
        >
          <RefreshCw
            className={`mr-2 size-4 ${recalculateMutation.isPending ? "animate-spin" : ""}`}
          />
          {recalculateMutation.isPending ? "Перерахунок..." : "Перерахувати сектора"}
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
        disabled={recalculateMutation.isPending}
      >
        <RefreshCw
          className={`size-4 ${recalculateMutation.isPending ? "animate-spin" : ""}`}
        />
        {recalculateMutation.isPending ? "Перерахунок..." : "Перерахувати сектора"}
      </Button>
    </div>
  );
}

