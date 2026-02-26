import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { EnrichedAnalogDto } from "@/modules/analogs/api/types";
import { AnalogDetailHeaderActionsView } from "@/modules/analogs/components/actions/analog-detail-header-actions/AnalogDetailHeaderActionsView";
import { Edit, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface AnalogDetailHeaderActionsProps {
  analog: EnrichedAnalogDto;
}

export function AnalogDetailHeaderActions({ analog }: AnalogDetailHeaderActionsProps) {
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const canEdit = hasRole(RoleType.ADMIN);
  const canDelete = hasRole(RoleType.PRIME);

  const openUpdateDialog = useCallback(() => {
    setUpdateDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    navigate("/arts/analogs");
  }, [navigate]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [];
    if (canEdit) {
      actions.push({
        id: "edit-analog",
        label: "Редагувати аналог",
        icon: Edit,
        iconColor: "blue",
        variant: "default",
        onClick: openUpdateDialog,
      });
    }
    if (canDelete) {
      actions.push({
        id: "delete-analog",
        label: "Видалити аналог",
        icon: Trash,
        iconColor: "red",
        variant: "super-destructive",
        onClick: openDeleteDialog,
      });
    }
    return actions;
  }, [canEdit, canDelete, openUpdateDialog, openDeleteDialog]);

  useRegisterHeaderActions(headerActions);

  return (
    <AnalogDetailHeaderActionsView
      analog={analog}
      updateDialogOpen={updateDialogOpen}
      onUpdateDialogOpenChange={setUpdateDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      onDeleteSuccess={handleDeleteSuccess}
    />
  );
}
