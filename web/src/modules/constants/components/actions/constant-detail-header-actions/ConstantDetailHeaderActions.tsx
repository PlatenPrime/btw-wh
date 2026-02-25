import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { ConstantDto } from "@/modules/constants/api/types";
import { ConstantDetailHeaderActionsView } from "@/modules/constants/components/actions/constant-detail-header-actions/ConstantDetailHeaderActionsView";
import { Plus, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface ConstantDetailHeaderActionsProps {
  constant: ConstantDto;
}

export function ConstantDetailHeaderActions({
  constant,
}: ConstantDetailHeaderActionsProps) {
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const [addEntryDialogOpen, setAddEntryDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const canEdit = hasRole(RoleType.ADMIN);
  const canDelete = hasRole(RoleType.PRIME);

  const openAddEntryDialog = useCallback(() => {
    setAddEntryDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    navigate("/wh/constants");
  }, [navigate]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [];
    if (canEdit) {
      actions.push({
        id: "add-constant-entry",
        label: "Додати пару",
        icon: Plus,
        iconColor: "blue",
        variant: "default",
        onClick: openAddEntryDialog,
      });
    }
    if (canDelete) {
      actions.push({
        id: "delete-constant",
        label: "Видалити константу",
        icon: Trash,
        iconColor: "red",
        variant: "super-destructive",
        onClick: openDeleteDialog,
      });
    }
    return actions;
  }, [canEdit, canDelete, openAddEntryDialog, openDeleteDialog]);

  useRegisterHeaderActions(headerActions);

  return (
    <ConstantDetailHeaderActionsView
      constant={constant}
      addEntryDialogOpen={addEntryDialogOpen}
      onAddEntryDialogOpenChange={setAddEntryDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      onDeleteSuccess={handleDeleteSuccess}
    />
  );
}
