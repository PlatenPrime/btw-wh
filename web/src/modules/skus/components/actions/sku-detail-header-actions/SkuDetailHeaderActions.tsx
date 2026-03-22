import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { SkuDto } from "@/modules/skus/api/types";
import { SkuDetailHeaderActionsView } from "./SkuDetailHeaderActionsView";
import { FileDown, TrendingUp } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface SkuDetailHeaderActionsProps {
  sku: SkuDto;
}

export function SkuDetailHeaderActions({ sku }: SkuDetailHeaderActionsProps) {
  const { hasRole } = useAuth();
  const [sliceExcelDialogOpen, setSliceExcelDialogOpen] = useState(false);
  const [salesExcelDialogOpen, setSalesExcelDialogOpen] = useState(false);

  const canExportExcel = hasRole(RoleType.USER);

  const openSliceExcelDialog = useCallback(() => {
    setSliceExcelDialogOpen(true);
  }, []);

  const openSalesExcelDialog = useCallback(() => {
    setSalesExcelDialogOpen(true);
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
    return actions;
  }, [canExportExcel, openSliceExcelDialog, openSalesExcelDialog]);

  useRegisterHeaderActions(headerActions);

  return (
    <SkuDetailHeaderActionsView
      sku={sku}
      sliceExcelDialogOpen={sliceExcelDialogOpen}
      onSliceExcelDialogOpenChange={setSliceExcelDialogOpen}
      salesExcelDialogOpen={salesExcelDialogOpen}
      onSalesExcelDialogOpenChange={setSalesExcelDialogOpen}
    />
  );
}
