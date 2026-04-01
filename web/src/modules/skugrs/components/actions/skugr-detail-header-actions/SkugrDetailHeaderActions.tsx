import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { SkugrDetailHeaderActionsView } from "@/modules/skugrs/components/actions/skugr-detail-header-actions/SkugrDetailHeaderActionsView";
import { FileDown, Pencil, RefreshCw, Trash, TrendingUp } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface SkugrDetailHeaderActionsProps {
  skugr: SkugrPageDto;
}

export function SkugrDetailHeaderActions({ skugr }: SkugrDetailHeaderActionsProps) {
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const [sliceExcelDialogOpen, setSliceExcelDialogOpen] = useState(false);
  const [salesExcelDialogOpen, setSalesExcelDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [fillDialogOpen, setFillDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const canExportExcel = hasRole(RoleType.USER);
  const canAdmin = hasRole(RoleType.ADMIN);
  const canDelete = hasRole(RoleType.PRIME);

  const openEditDialog = useCallback(() => {
    setEditDialogOpen(true);
  }, []);

  const openFillDialog = useCallback(() => {
    setFillDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const openSliceExcelDialog = useCallback(() => {
    setSliceExcelDialogOpen(true);
  }, []);

  const openSalesExcelDialog = useCallback(() => {
    setSalesExcelDialogOpen(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    navigate("/sku/skugrs");
  }, [navigate]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [];
    if (canExportExcel) {
      actions.push(
        {
          id: "skugr-slice-excel",
          label: "Скачати Excel залишків",
          icon: FileDown,
          iconColor: "green",
          variant: "default",
          onClick: openSliceExcelDialog,
        },
        {
          id: "skugr-sales-excel",
          label: "Скачати Excel продажів",
          icon: TrendingUp,
          iconColor: "green",
          variant: "default",
          onClick: openSalesExcelDialog,
        },
      );
    }
    if (canAdmin) {
      actions.push(
        {
          id: "edit-skugr",
          label: "Редагувати",
          icon: Pencil,
          iconColor: "sky",
          variant: "default",
          onClick: openEditDialog,
        },
        {
          id: "fill-skugr-skus",
          label: "Заповнити товарами",
          icon: RefreshCw,
          iconColor: "emerald",
          variant: "default",
          onClick: openFillDialog,
        },
      );
    }
    if (canDelete) {
      actions.push({
        id: "delete-skugr",
        label: "Видалити товарну групу",
        icon: Trash,
        iconColor: "red",
        variant: "super-destructive",
        onClick: openDeleteDialog,
      });
    }
    return actions;
  }, [
    canExportExcel,
    canAdmin,
    canDelete,
    openSliceExcelDialog,
    openSalesExcelDialog,
    openEditDialog,
    openFillDialog,
    openDeleteDialog,
  ]);

  useRegisterHeaderActions(headerActions);

  return (
    <SkugrDetailHeaderActionsView
      skugr={skugr}
      sliceExcelDialogOpen={sliceExcelDialogOpen}
      onSliceExcelDialogOpenChange={setSliceExcelDialogOpen}
      salesExcelDialogOpen={salesExcelDialogOpen}
      onSalesExcelDialogOpenChange={setSalesExcelDialogOpen}
      editDialogOpen={editDialogOpen}
      onEditDialogOpenChange={setEditDialogOpen}
      fillDialogOpen={fillDialogOpen}
      onFillDialogOpenChange={setFillDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      onDeleteSuccess={handleDeleteSuccess}
    />
  );
}
