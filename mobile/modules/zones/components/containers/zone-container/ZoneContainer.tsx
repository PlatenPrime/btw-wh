import { useRegisterHeaderActions } from "@/components/layout/header";
import type { ZoneDto } from "@/modules/zones/api/types/dto";
import { ZoneContainerView } from "@/modules/zones/components/containers/zone-container/ZoneContainerView";
import { useState } from "react";
import { useRouter } from "expo-router";

interface ZoneContainerProps {
  zone: ZoneDto;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ZoneContainer({
  zone,
  refreshing,
  onRefresh,
}: ZoneContainerProps) {
  const router = useRouter();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteSuccess = () => {
    router.back();
    setDeleteDialogOpen(false);
  };

  // Регистрируем действия в header меню
  useRegisterHeaderActions([
    {
      id: "edit-zone",
      label: "Редагувати зону",
      icon: "edit",
      iconColor: "blue",
      variant: "default",
      onClick: () => setUpdateDialogOpen(true),
    },
    {
      id: "delete-zone",
      label: "Видалити зону",
      icon: "delete",
      iconColor: "red",
      variant: "destructive",
      onClick: () => setDeleteDialogOpen(true),
    },
  ]);

  return (
    <ZoneContainerView
      zone={zone}
      updateDialogOpen={updateDialogOpen}
      setUpdateDialogOpen={setUpdateDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      setDeleteDialogOpen={setDeleteDialogOpen}
      onDeleteSuccess={handleDeleteSuccess}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

