import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useRole } from "@/modules/auth/hooks/useRole";
import { SkuSlicesHeaderActionsView } from "@/modules/sku-analytics/components/actions/sku-slices-header-actions/SkuSlicesHeaderActionsView";
import { RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function SkuSlicesHeaderActions() {
  const { isAdmin } = useRole();
  const canRun = isAdmin();

  const [compensatingDialogOpen, setCompensatingDialogOpen] = useState(false);

  const openCompensatingDialog = useCallback(() => {
    setCompensatingDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(() => {
    if (!canRun) {
      return [];
    }

    return [
      {
        id: "run-compensating-slice",
        label: "Компенсуючий зріз",
        icon: RefreshCw,
        iconColor: "blue",
        variant: "default",
        onClick: openCompensatingDialog,
      },
    ];
  }, [canRun, openCompensatingDialog]);

  useRegisterHeaderActions(headerActions);

  return (
    <SkuSlicesHeaderActionsView
      compensatingDialogOpen={compensatingDialogOpen}
      onCompensatingDialogOpenChange={setCompensatingDialogOpen}
      canRun={canRun}
    />
  );
}
