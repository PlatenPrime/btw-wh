import type { HeaderAction } from "@/components/layout/header";
import { useRegisterHeaderActions } from "@/components/layout/header";
import type { ZoneDto } from "@/modules/zones/api/types/dto";
import { ZoneDetailHeaderActionsView } from "@/modules/zones/components/actions/zone-detail-header-actions/ZoneDetailHeaderActionsView";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";

interface ZoneDetailHeaderActionsProps {
  zone: ZoneDto;
}

export function ZoneDetailHeaderActions({ zone }: ZoneDetailHeaderActionsProps) {
  const router = useRouter();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openUpdateDialog = useCallback(() => {
    setUpdateDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    router.back();
  }, [router]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "edit-zone",
        label: "Редагувати зону",
        icon: "edit",
        iconColor: "blue",
        textColor: "blue",
        variant: "default",
        onClick: openUpdateDialog,
      },
      {
        id: "delete-zone",
        label: "Видалити зону",
        icon: "delete",
        iconColor: "red",
        textColor: "red",
        variant: "destructive",
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

