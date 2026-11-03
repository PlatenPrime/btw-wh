import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { Download } from "lucide-react";
import { useCallback, useMemo } from "react";

interface SkuStatisticsSkugrHeaderActionsProps {
  canExport: boolean;
  onExcelDialogOpenChange?: (open: boolean) => void;
}

export function SkuStatisticsSkugrHeaderActions({
  canExport,
  onExcelDialogOpenChange,
}: SkuStatisticsSkugrHeaderActionsProps) {
  const { hasRole } = useAuth();
  const canExportExcel = hasRole(RoleType.USER);

  const openExcelDialog = useCallback(() => {
    if (!canExport) return;
    onExcelDialogOpenChange?.(true);
  }, [canExport, onExcelDialogOpenChange]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    if (!canExportExcel) return [];
    return [
      {
        id: "sku-statistics-skugr-download-share-excel",
        label: "Скачати Excel з фото",
        icon: Download,
        iconColor: "green",
        variant: "default",
        onClick: openExcelDialog,
      },
    ];
  }, [canExportExcel, openExcelDialog]);

  useRegisterHeaderActions(headerActions);

  return null;
}
