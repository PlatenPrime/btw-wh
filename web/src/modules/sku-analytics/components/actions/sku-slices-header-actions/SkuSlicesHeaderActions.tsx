import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useRole } from "@/modules/auth/hooks/useRole";
import { SkuSlicesHeaderActionsView } from "@/modules/sku-analytics/components/actions/sku-slices-header-actions/SkuSlicesHeaderActionsView";
import { useSkuSlicesParams } from "@/modules/sku-analytics/hooks/useSkuSlicesParams";
import { ArrowLeftRight, RefreshCw } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

export function SkuSlicesHeaderActions() {
  const { isAdmin } = useRole();
  const canRun = isAdmin();
  const navigate = useNavigate();
  const { konk } = useSkuSlicesParams();

  const [compensatingDialogOpen, setCompensatingDialogOpen] = useState(false);

  const openCompensatingDialog = useCallback(() => {
    setCompensatingDialogOpen(true);
  }, []);

  const openPackFlips = useCallback(() => {
    const params = new URLSearchParams();
    if (konk) {
      params.set("konk", konk);
    }
    const query = params.toString();
    navigate(query ? `/sku/pack-flips?${query}` : "/sku/pack-flips");
  }, [konk, navigate]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    if (!canRun) {
      return [];
    }

    return [
      {
        id: "check-pack-flips",
        label: "Перевірити скачки",
        icon: ArrowLeftRight,
        iconColor: "amber",
        variant: "default",
        onClick: openPackFlips,
      },
      {
        id: "run-compensating-slice",
        label: "Компенсуючий зріз",
        icon: RefreshCw,
        iconColor: "blue",
        variant: "default",
        onClick: openCompensatingDialog,
      },
    ];
  }, [canRun, openCompensatingDialog, openPackFlips]);

  useRegisterHeaderActions(headerActions);

  return (
    <SkuSlicesHeaderActionsView
      compensatingDialogOpen={compensatingDialogOpen}
      onCompensatingDialogOpenChange={setCompensatingDialogOpen}
      canRun={canRun}
    />
  );
}
