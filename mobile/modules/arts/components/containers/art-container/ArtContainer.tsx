import { useState } from "react";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtContainerView } from "./ArtContainerView";
import { useRegisterHeaderActions } from "@/components/layout/header";

interface ArtContainerProps {
  artData: ArtDto;
}

export function ArtContainer({ artData }: ArtContainerProps) {
  const [updateLimitDialogOpen, setUpdateLimitDialogOpen] = useState(false);

  // Регистрируем действия в header меню
  useRegisterHeaderActions([
    {
      id: "update-art-limit",
      label: "Змінити ліміт",
      icon: "edit",
      variant: "default",
      onClick: () => setUpdateLimitDialogOpen(true),
    },
  ]);

  return (
    <ArtContainerView
      artData={artData}
      updateLimitDialogOpen={updateLimitDialogOpen}
      setUpdateLimitDialogOpen={setUpdateLimitDialogOpen}
    />
  );
}
