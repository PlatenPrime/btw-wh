import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { VariantDto } from "@/modules/variants/api/types";
import { VariantDetailHeaderActionsView } from "@/modules/variants/components/actions/variant-detail-header-actions/VariantDetailHeaderActionsView";
import { Edit, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface VariantDetailHeaderActionsProps {
  variant: VariantDto;
}

export function VariantDetailHeaderActions({ variant }: VariantDetailHeaderActionsProps) {
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
    navigate("/arts/variants");
  }, [navigate]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [];

    if (canEdit) {
      actions.push({
        id: "edit-variant",
        label: "Редагувати варіант",
        icon: Edit,
        iconColor: "blue",
        variant: "default",
        onClick: openUpdateDialog,
      });
    }

    if (canDelete) {
      actions.push({
        id: "delete-variant",
        label: "Видалити варіант",
        icon: Trash,
        iconColor: "red",
        variant: "super-destructive",
        onClick: openDeleteDialog,
      });
    }

    return actions;
  }, [canDelete, canEdit, openDeleteDialog, openUpdateDialog]);

  useRegisterHeaderActions(headerActions);

  return (
    <VariantDetailHeaderActionsView
      variant={variant}
      updateDialogOpen={updateDialogOpen}
      onUpdateDialogOpenChange={setUpdateDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      onDeleteSuccess={handleDeleteSuccess}
    />
  );
}

