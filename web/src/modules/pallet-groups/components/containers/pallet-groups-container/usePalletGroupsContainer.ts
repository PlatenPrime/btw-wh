import { useReorderPalletGroupsMutation } from "@/modules/pallet-groups/api/hooks/mutations/useReorderPalletGroupsMutation";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UsePalletGroupsContainerProps {
  initialData: PalletGroupDto[];
}

interface UsePalletGroupsContainerReturn {
  groups: PalletGroupDto[];
  isEditMode: boolean;
  isSaving: boolean;
  handleEnterEditMode: () => void;
  handleCancel: () => void;
  handleSave: () => Promise<void>;
  handleDragEnd: (newGroups: PalletGroupDto[]) => void;
}

function isOrderChanged(
  groups: PalletGroupDto[],
  originalGroups: PalletGroupDto[],
): boolean {
  if (groups.length !== originalGroups.length) return true;
  return groups.some((g, i) => originalGroups[i]?.id !== g.id);
}

export function usePalletGroupsContainer({
  initialData,
}: UsePalletGroupsContainerProps): UsePalletGroupsContainerReturn {
  const [groups, setGroups] = useState<PalletGroupDto[]>(initialData);
  const [originalGroups, setOriginalGroups] =
    useState<PalletGroupDto[]>(initialData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const reorderMutation = useReorderPalletGroupsMutation();

  useEffect(() => {
    setGroups(initialData);
    setOriginalGroups(initialData);
  }, [initialData]);

  const handleEnterEditMode = () => {
    setOriginalGroups([...groups]);
    setIsEditMode(true);
  };

  const handleCancel = useCallback(() => {
    setGroups([...originalGroups]);
    setIsEditMode(false);
  }, [originalGroups]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);

    try {
      if (!isOrderChanged(groups, originalGroups) || groups.length === 0) {
        setIsEditMode(false);
        return;
      }

      const orders = groups.map((g, i) => ({ id: g.id, order: i + 1 }));
      await reorderMutation.mutateAsync({ orders });

      setIsEditMode(false);

      toast.info(
        "Порядок груп палет збережено. Сектори палет не перераховані автоматично. Використайте кнопку 'Перерахувати сектора' для оновлення.",
        { duration: 5000 },
      );
    } catch (error) {
      console.error("Помилка збереження порядку груп палет:", error);
    } finally {
      setIsSaving(false);
    }
  }, [groups, originalGroups, reorderMutation]);

  const handleDragEnd = (newGroups: PalletGroupDto[]) => {
    setGroups(newGroups);
  };

  return {
    groups,
    isEditMode,
    isSaving,
    handleEnterEditMode,
    handleCancel,
    handleSave,
    handleDragEnd,
  };
}
