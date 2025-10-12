import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtContainerView } from "@/modules/arts/components/containers/art-container/ArtContainerView.tsx";
import { Edit, MessageSquarePlus } from "lucide-react";
import { useState } from "react";

interface ArtContainerProps {
  artData: ArtDto;
}

export function ArtContainer({ artData }: ArtContainerProps) {
  // Состояния для диалогов
  const [updateLimitDialogOpen, setUpdateLimitDialogOpen] = useState(false);
  const [createAskDialogOpen, setCreateAskDialogOpen] = useState(false);

  // Регистрируем действия в header меню
  useRegisterHeaderActions([
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
