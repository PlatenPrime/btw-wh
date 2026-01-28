import { useUpdatePalletGroupMutation } from "@/modules/pallet-groups/api/hooks/mutations/useUpdatePalletGroupMutation";
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

const buildGroupsPayload = (
  groups: PalletGroupDto[],
  originalGroups: PalletGroupDto[],
) => {
  return groups.reduce<
    {
      id: string;
      order: number;
    }[]
  >((acc, group, index) => {
    const original = originalGroups.find((item) => item.id === group.id);
    const nextOrder = index + 1;
    if (!original || original.order !== nextOrder) {
      acc.push({
        id: group.id,
        order: nextOrder,
      });
    }
    return acc;
  }, []);
};

export function usePalletGroupsContainer({
  initialData,
}: UsePalletGroupsContainerProps): UsePalletGroupsContainerReturn {
  const [groups, setGroups] = useState<PalletGroupDto[]>(initialData);
  const [originalGroups, setOriginalGroups] =
    useState<PalletGroupDto[]>(initialData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const updateMutation = useUpdatePalletGroupMutation();

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
      const payload = buildGroupsPayload(groups, originalGroups);

      if (payload.length === 0) {
        setIsEditMode(false);
        return;
      }

      // Простая последовательная отправка; при необходимости можно оптимизировать
      await Promise.all(
        payload.map((item) =>
          updateMutation.mutateAsync({
            id: item.id,
            data: { order: item.order },
          }),
        ),
      );

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
  }, [groups, originalGroups, updateMutation]);

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
