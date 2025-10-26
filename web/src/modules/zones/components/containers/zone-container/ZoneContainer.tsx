import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { ZoneDto } from "@/modules/zones/api/types";
import { ZoneContainerView } from "@/modules/zones/components/containers/zone-container/ZoneContainerView";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface ZoneContainerProps {
  zone: ZoneDto;
}

export function ZoneContainer({ zone }: ZoneContainerProps) {
  const navigate = useNavigate();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteSuccess = () => {
    navigate("/wh/zones");
  };

  // Реєструємо дії в header меню
  useRegisterHeaderActions([
    {
      id: "edit-zone",
      label: "Редагувати зону",
      icon: Edit,
      iconColor: "blue",
      variant: "default",
      onClick: () => setUpdateDialogOpen(true),
    },
    {
      id: "delete-zone",
      label: "Видалити зону",
      icon: Trash,
      iconColor: "red",
      variant: "super-destructive",
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
    />
  );
}
