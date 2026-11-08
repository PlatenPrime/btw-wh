import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { SkuStockBandDto } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandDetailHeaderActionsView } from "@/modules/sku-stock-bands/components/actions/sku-stock-band-detail-header-actions/SkuStockBandDetailHeaderActionsView";
import { Edit, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface SkuStockBandDetailHeaderActionsProps {
  band: SkuStockBandDto;
}

export function SkuStockBandDetailHeaderActions({
  band,
}: SkuStockBandDetailHeaderActionsProps) {
  const navigate = useNavigate();
  const { hasRole } = useAuth();
  const canManage = hasRole(RoleType.ADMIN);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openUpdateDialog = useCallback(() => {
    setUpdateDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    navigate("/sku/stock-bands");
  }, [navigate]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    if (!canManage) return [];
    return [
      {
        id: "edit-sku-stock-band",
        label: "Редагувати",
        icon: Edit,
        iconColor: "blue",
        variant: "edit",
        onClick: openUpdateDialog,
      },
      {
        id: "delete-sku-stock-band",
        label: "Видалити",
        icon: Trash,
        iconColor: "red",
        variant: "destructive",
        onClick: openDeleteDialog,
      },
    ];
  }, [canManage, openDeleteDialog, openUpdateDialog]);

  useRegisterHeaderActions(headerActions);

  return (
    <SkuStockBandDetailHeaderActionsView
      band={band}
      updateDialogOpen={updateDialogOpen}
      onUpdateDialogOpenChange={setUpdateDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      onDeleteSuccess={handleDeleteSuccess}
    />
  );
}
