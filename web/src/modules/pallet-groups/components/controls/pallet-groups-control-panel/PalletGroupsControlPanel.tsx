import { Button } from "@/components/ui/button";
import { useRecalculatePalletsSectorsMutation } from "@/modules/pallet-groups/api/hooks/mutations/useRecalculatePalletsSectorsMutation";
import { useResetPalletsSectorsMutation } from "@/modules/pallet-groups/api/hooks/mutations/useResetPalletsSectorsMutation";
import { Edit, Plus, RefreshCw, RotateCcw, Save, X } from "lucide-react";

interface PalletGroupsControlPanelProps {
  isEditMode: boolean;
  hasGroups: boolean;
  onCreate: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving?: boolean;
}

export function PalletGroupsControlPanel({
  isEditMode,
  hasGroups,
  onCreate,
  onEdit,
  onCancel,
  onSave,
  isSaving = false,
}: PalletGroupsControlPanelProps) {
  const recalculateMutation = useRecalculatePalletsSectorsMutation();
  const resetMutation = useResetPalletsSectorsMutation();

  const handleRecalculate = () => {
    recalculateMutation.mutate();
  };

  const handleReset = () => {
    // Простое підтвердження перед масовим скиданням
    const confirmed = window.confirm(
      "Ви впевнені, що хочете скинути сектори всіх палет і прибрати зв'язок з групами? Дію не можна скасувати.",
    );
    if (!confirmed) {
      return;
    }

    resetMutation.mutate();
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
          {recalculateMutation.isPending
            ? "Перерахунок..."
            : "Перерахувати сектора"}
        </Button>
      </div>
    );
  }

  if (!hasGroups) {
    return (
      <div className="flex gap-2">
        <Button onClick={onCreate}>
          <Plus className="mr-2 size-4" />
          Створити групу
        </Button>
        <Button
          onClick={handleReset}
          variant="outline"
          disabled={resetMutation.isPending}
        >
          <RotateCcw
            className={`mr-2 size-4 ${resetMutation.isPending ? "animate-spin" : ""}`}
          />
          {resetMutation.isPending ? "Скидання..." : "Скинути сектора"}
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-2 md:flex">
      <Button onClick={onCreate}>
        <Plus className="mr-2 size-4" />
        Створити групу
      </Button>
      <Button onClick={onEdit} variant="outline">
        <Edit className="mr-2 size-4" />
        Редагувати порядок
      </Button>
      <Button
        onClick={handleRecalculate}
        variant="outline"
        disabled={recalculateMutation.isPending}
      >
        <RefreshCw
          className={`mr-2 size-4 ${recalculateMutation.isPending ? "animate-spin" : ""}`}
        />
        {recalculateMutation.isPending
          ? "Перерахунок..."
          : "Перерахувати сектора"}
      </Button>
      <Button
        onClick={handleReset}
        variant="outline"
        disabled={resetMutation.isPending}
      >
        <RotateCcw
          className={`mr-2 size-4 ${resetMutation.isPending ? "animate-spin" : ""}`}
        />
        {resetMutation.isPending ? "Скидання..." : "Скинути сектора"}
      </Button>
    </div>
  );
}
