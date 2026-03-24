import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { KonkDto } from "@/modules/konks/api/types";
import { KonkDetailHeaderActionsView } from "@/modules/konks/components/actions/konk-detail-header-actions/KonkDetailHeaderActionsView";
import { Download, Edit, TrendingUp, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface KonkDetailHeaderActionsProps {
  konk: KonkDto;
}

export function KonkDetailHeaderActions({
  konk,
}: KonkDetailHeaderActionsProps) {
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [sliceExcelDialogOpen, setSliceExcelDialogOpen] = useState(false);
  const [salesExcelDialogOpen, setSalesExcelDialogOpen] = useState(false);

  const canEdit = hasRole(RoleType.ADMIN);
  const canDelete = hasRole(RoleType.PRIME);

  const openUpdateDialog = useCallback(() => {
    setUpdateDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    navigate("/sku/konks");
  }, [navigate]);

  const openSliceExcelDialog = useCallback(() => {
    setSliceExcelDialogOpen(true);
  }, []);

  const openSalesExcelDialog = useCallback(() => {
    setSalesExcelDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [];
    actions.push({
      id: "download-konk-slice-excel",
      label: "Скачати залишки",
      icon: Download,
      iconColor: "blue",
      variant: "default",
      onClick: openSliceExcelDialog,
    });
    actions.push({
      id: "download-konk-sales-excel",
      label: "Скачати продажі",
      icon: TrendingUp,
      iconColor: "green",
      variant: "default",
      onClick: openSalesExcelDialog,
    });
    if (canEdit) {
      actions.push({
        id: "edit-konk",
        label: "Редагувати",
        icon: Edit,
        iconColor: "blue",
        variant: "default",
        onClick: openUpdateDialog,
      });
    }
    if (canDelete) {
      actions.push({
        id: "delete-konk",
        label: "Видалити",
        icon: Trash,
        iconColor: "red",
        variant: "super-destructive",
        onClick: openDeleteDialog,
      });
    }
    return actions;
  }, [
    canEdit,
    canDelete,
    openUpdateDialog,
    openDeleteDialog,
    openSliceExcelDialog,
    openSalesExcelDialog,
  ]);

  useRegisterHeaderActions(headerActions);

  return (
    <KonkDetailHeaderActionsView
      konk={konk}
      updateDialogOpen={updateDialogOpen}
      onUpdateDialogOpenChange={setUpdateDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      onDeleteSuccess={handleDeleteSuccess}
      sliceExcelDialogOpen={sliceExcelDialogOpen}
      onSliceExcelDialogOpenChange={setSliceExcelDialogOpen}
      salesExcelDialogOpen={salesExcelDialogOpen}
      onSalesExcelDialogOpenChange={setSalesExcelDialogOpen}
    />
  );
}
