import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { ZoneDto } from "@/modules/zones/api/types";
import { ZoneDetailHeaderActionsView } from "@/modules/zones/components/actions/zone-detail-header-actions/ZoneDetailHeaderActionsView";
import { Edit, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface ZoneDetailHeaderActionsProps {
  zone: ZoneDto;
}

export function ZoneDetailHeaderActions({ zone }: ZoneDetailHeaderActionsProps) {
  const navigate = useNavigate();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openUpdateDialog = useCallback(() => {
    setUpdateDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    navigate("/wh/zones");
  }, [navigate]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "edit-zone",
        label: "Редагувати зону",
        icon: Edit,
        iconColor: "blue",
        variant: "default",
        onClick: openUpdateDialog,
      },
      {
        id: "delete-zone",
        label: "Видалити зону",
        icon: Trash,
        iconColor: "red",
        variant: "super-destructive",
        onClick: openDeleteDialog,
      },
    ],
    [openDeleteDialog, openUpdateDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <ZoneDetailHeaderActionsView
      zone={zone}
      updateDialogOpen={updateDialogOpen}
      onUpdateDialogOpenChange={setUpdateDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      onDeleteSuccess={handleDeleteSuccess}
    />
  );
}

