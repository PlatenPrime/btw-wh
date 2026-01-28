import { useSetPalletsForGroupMutation } from "@/modules/pallet-groups/api/hooks/mutations/useSetPalletsForGroupMutation";
import { useUnlinkPalletMutation } from "@/modules/pallet-groups/api/hooks/mutations/useUnlinkPalletMutation";
import type {
  PalletGroupDto,
  PalletShortDto,
} from "@/modules/pallet-groups/api/types";
import { PalletGroupContainerView } from "@/modules/pallet-groups/components/containers/pallet-group-container/PalletGroupContainerView";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface PalletGroupContainerProps {
  group: PalletGroupDto;
}

export function PalletGroupContainer({ group }: PalletGroupContainerProps) {
  const [pallets, setPallets] = useState<PalletShortDto[]>(group.pallets ?? []);
  const [originalPallets, setOriginalPallets] = useState<PalletShortDto[]>(
    group.pallets ?? [],
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const setPalletsMutation = useSetPalletsForGroupMutation();
  const unlinkPalletMutation = useUnlinkPalletMutation();

  useEffect(() => {
    setPallets(group.pallets ?? []);
    setOriginalPallets(group.pallets ?? []);
  }, [group]);

  const handleEnterEditMode = () => {
    setOriginalPallets([...pallets]);
    setIsEditMode(true);
  };

  const handleCancel = useCallback(() => {
    setPallets([...originalPallets]);
    setIsEditMode(false);
  }, [originalPallets]);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    try {
      const currentIds = pallets.map((p) => p.id);
      const originalIds = originalPallets.map((p) => p.id);
      const isSame =
        currentIds.length === originalIds.length &&
        currentIds.every((id, index) => id === originalIds[index]);

      if (isSame) {
        setIsEditMode(false);
        return;
      }

      await setPalletsMutation.mutateAsync({
        groupId: group.id,
        palletIds: currentIds,
      });

      setIsEditMode(false);

      toast.info(
        "Порядок палет у групі збережено. Сектори палет не перераховані автоматично. Використайте кнопку 'Перерахувати сектора' на сторінці груп.",
        { duration: 5000 },
      );
    } catch (error) {
      console.error("Помилка збереження порядку палет у групі:", error);
    } finally {
      setIsSaving(false);
    }
  }, [group.id, pallets, originalPallets, setPalletsMutation]);

  const handleDragEnd = (newPallets: PalletShortDto[]) => {
    setPallets(newPallets);
  };

  const handleUnlink = async (pallet: PalletShortDto) => {
    try {
      await unlinkPalletMutation.mutateAsync({ palletId: pallet.id });
      setPallets((prev) => prev.filter((p) => p.id !== pallet.id));
    } catch (error) {
      console.error("Помилка відв'язки палети від групи:", error);
    }
  };

  return (
    <PalletGroupContainerView
      group={group}
      pallets={pallets}
      isEditMode={isEditMode}
      isSaving={isSaving}
      onEnterEditMode={handleEnterEditMode}
      onCancel={handleCancel}
      onSave={handleSave}
      onDragEnd={handleDragEnd}
      onUnlink={handleUnlink}
    />
  );
}
