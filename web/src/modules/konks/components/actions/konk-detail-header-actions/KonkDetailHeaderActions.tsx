import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { KonkDto } from "@/modules/konks/api/types";
import { KonkDetailHeaderActionsView } from "@/modules/konks/components/actions/konk-detail-header-actions/KonkDetailHeaderActionsView";
import { Edit, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface KonkDetailHeaderActionsProps {
  konk: KonkDto;
}

export function KonkDetailHeaderActions({ konk }: KonkDetailHeaderActionsProps) {
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
    navigate("/wh/konks");
  }, [navigate]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [];
    if (canEdit) {
      actions.push({
        id: "edit-konk",
        label: "Редагувати конкурента",
        icon: Edit,
        iconColor: "blue",
        variant: "default",
        onClick: openUpdateDialog,
      });
    }
    if (canDelete) {
      actions.push({
        id: "delete-konk",
        label: "Видалити конкурента",
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
    <KonkDetailHeaderActionsView
      konk={konk}
      updateDialogOpen={updateDialogOpen}
      onUpdateDialogOpenChange={setUpdateDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      onDeleteSuccess={handleDeleteSuccess}
    />
  );
}
