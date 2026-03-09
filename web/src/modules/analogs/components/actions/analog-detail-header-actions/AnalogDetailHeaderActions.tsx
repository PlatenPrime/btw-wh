import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { EnrichedAnalogDto } from "@/modules/analogs/api/types";
import { AnalogDetailHeaderActionsView } from "@/modules/analogs/components/actions/analog-detail-header-actions/AnalogDetailHeaderActionsView";
import { Edit, FileDown, Trash, TrendingUp } from "lucide-react";
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
  const [comparisonExcelDialogOpen, setComparisonExcelDialogOpen] = useState(false);
  const [salesComparisonExcelDialogOpen, setSalesComparisonExcelDialogOpen] = useState(false);

  const canEdit = hasRole(RoleType.ADMIN);
  const canDelete = hasRole(RoleType.PRIME);
  const canExportExcel = hasRole(RoleType.USER);

  const openUpdateDialog = useCallback(() => {
    setUpdateDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const openComparisonExcelDialog = useCallback(() => {
    setComparisonExcelDialogOpen(true);
  }, []);

  const openSalesComparisonExcelDialog = useCallback(() => {
    setSalesComparisonExcelDialogOpen(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    navigate("/arts/analogs");
  }, [navigate]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [];
    if (canExportExcel) {
      actions.push({
        id: "comparison-excel",
        label: "Скачати Excel порівняння",
        icon: FileDown,
        iconColor: "green",
        variant: "default",
        onClick: openComparisonExcelDialog,
      });
      actions.push({
        id: "sales-comparison-excel",
        label: "Скачати Excel порівняння продаж",
        icon: TrendingUp,
        iconColor: "green",
        variant: "default",
        onClick: openSalesComparisonExcelDialog,
      });
    }
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
  }, [canExportExcel, canEdit, canDelete, openComparisonExcelDialog, openSalesComparisonExcelDialog, openUpdateDialog, openDeleteDialog]);

  useRegisterHeaderActions(headerActions);

  return (
    <AnalogDetailHeaderActionsView
      analog={analog}
      updateDialogOpen={updateDialogOpen}
      onUpdateDialogOpenChange={setUpdateDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      comparisonExcelDialogOpen={comparisonExcelDialogOpen}
      onComparisonExcelDialogOpenChange={setComparisonExcelDialogOpen}
      salesComparisonExcelDialogOpen={salesComparisonExcelDialogOpen}
      onSalesComparisonExcelDialogOpenChange={setSalesComparisonExcelDialogOpen}
      onDeleteSuccess={handleDeleteSuccess}
    />
  );
}
