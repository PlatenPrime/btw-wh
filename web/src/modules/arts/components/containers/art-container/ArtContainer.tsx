import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useUpdateBtradeStockMutation } from "@/modules/arts/api/hooks/mutations/useUpdateBtradeStockMutation";
import { ArtContainerView } from "@/modules/arts/components/containers/art-container/ArtContainerView.tsx";
import { Edit, MessageSquarePlus, RefreshCw } from "lucide-react";
import { useState } from "react";

interface ArtContainerProps {
  artData: ArtDto;
}

export function ArtContainer({ artData }: ArtContainerProps) {
  // Состояния для диалогов
  const [updateLimitDialogOpen, setUpdateLimitDialogOpen] = useState(false);
  const [createAskDialogOpen, setCreateAskDialogOpen] = useState(false);

  // Хук для обновления btradeStock
  const updateBtradeStockMutation = useUpdateBtradeStockMutation({
    artikul: artData.artikul as unknown as Pick<ArtDto, "artikul">,
  });

  const handleUpdateBtradeStock = async () => {
    try {
      await updateBtradeStockMutation.mutateAsync(artData.artikul);
    } catch (error) {
      console.error("Ошибка обновления BtradeStock:", error);
    }
  };

  // Регистрируем действия в header меню
  useRegisterHeaderActions([
    {
      id: "update-btrade-stock",
      label: "Оновити Btrade Stock",
      icon: RefreshCw,
      iconColor: "blue",
      variant: "default",
      onClick: handleUpdateBtradeStock,
    },
    {
      id: "update-art-limit",
      label: "Змінити ліміт",
      icon: Edit,
      variant: "default",
      onClick: () => setUpdateLimitDialogOpen(true),
    },
    {
      id: "create-ask",
      label: "Створити запит",
      icon: MessageSquarePlus,
      iconColor: "emerald",
      variant: "default",
      onClick: () => setCreateAskDialogOpen(true),
    },
  ]);

  return (
    <ArtContainerView
      artData={artData}
      // Update limit dialog props
      updateLimitDialogOpen={updateLimitDialogOpen}
      setUpdateLimitDialogOpen={setUpdateLimitDialogOpen}
      // Create ask dialog props
      createAskDialogOpen={createAskDialogOpen}
      setCreateAskDialogOpen={setCreateAskDialogOpen}
    />
  );
}
