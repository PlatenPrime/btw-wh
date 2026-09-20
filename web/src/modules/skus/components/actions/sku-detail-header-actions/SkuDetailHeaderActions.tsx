import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { SkuDto } from "@/modules/skus/api/types";
import { SkuDetailHeaderActionsView } from "./SkuDetailHeaderActionsView";
import { FileDown, Pencil, TrendingUp } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface SkuDetailHeaderActionsProps {
  sku: SkuDto;
}

export function SkuDetailHeaderActions({ sku }: SkuDetailHeaderActionsProps) {
  const { hasRole } = useAuth();
  const [sliceExcelDialogOpen, setSliceExcelDialogOpen] = useState(false);
  const [salesExcelDialogOpen, setSalesExcelDialogOpen] = useState(false);
  const [patchSliceDialogOpen, setPatchSliceDialogOpen] = useState(false);

  const canExportExcel = hasRole(RoleType.USER);
  const canPatchSlice = hasRole(RoleType.ADMIN);

  const openSliceExcelDialog = useCallback(() => {
    setSliceExcelDialogOpen(true);
  }, []);

  const openSalesExcelDialog = useCallback(() => {
    setSalesExcelDialogOpen(true);
  }, []);

  const openPatchSliceDialog = useCallback(() => {
    setPatchSliceDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [];
    if (canExportExcel) {
      actions.push({
        id: "sku-slice-excel",
        label: "Скачати Excel залишків",
        icon: FileDown,
        iconColor: "green",
        variant: "default",
        onClick: openSliceExcelDialog,
      });
      actions.push({
        id: "sku-sales-excel",
        label: "Скачати Excel продажів",
        icon: TrendingUp,
        iconColor: "green",
        variant: "default",
        onClick: openSalesExcelDialog,
      });
    }
    if (canPatchSlice) {
      actions.push({
        id: "patch-sku-slice",
        label: "Виправити зріз",
        icon: Pencil,
        iconColor: "blue",
        variant: "edit",
        onClick: openPatchSliceDialog,
      });
    }
    return actions;
  }, [
    canExportExcel,
    canPatchSlice,
    openSliceExcelDialog,
    openSalesExcelDialog,
    openPatchSliceDialog,
  ]);

  useRegisterHeaderActions(headerActions);

  return (
    <SkuDetailHeaderActionsView
      sku={sku}
      sliceExcelDialogOpen={sliceExcelDialogOpen}
      onSliceExcelDialogOpenChange={setSliceExcelDialogOpen}
      salesExcelDialogOpen={salesExcelDialogOpen}
      onSalesExcelDialogOpenChange={setSalesExcelDialogOpen}
      patchSliceDialogOpen={patchSliceDialogOpen}
      onPatchSliceDialogOpenChange={setPatchSliceDialogOpen}
    />
  );
}
