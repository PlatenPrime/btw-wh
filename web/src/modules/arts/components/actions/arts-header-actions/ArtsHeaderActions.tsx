import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { ArtsHeaderActionsView } from "@/modules/arts/components/actions/arts-header-actions/ArtsHeaderActionsView";
import { useRole } from "@/modules/auth/hooks/useRole";
import { useStartExcelJob } from "@/modules/excel-jobs";
import { ArrowDown, FileSpreadsheet, Play, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";

export function ArtsHeaderActions() {
  const navigate = useNavigate();
  const { isPrime, isAdmin } = useRole();
  const canDelete = isPrime();
  const canUpdateBtradeStocks = isAdmin();
  const { startJob, isStarting } = useStartExcelJob();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateBtradeStocksDialogOpen, setUpdateBtradeStocksDialogOpen] =
    useState(false);

  const handleExport = useCallback(() => {
    if (isStarting) return;
    void startJob({ kind: "arts-export", title: "Експорт артикулів" });
  }, [isStarting, startJob]);

  const handleExportWithStocks = useCallback(() => {
    if (isStarting) return;
    void startJob({
      kind: "arts-export-with-stocks",
      title: "Артикули з залишками",
    });
  }, [isStarting, startJob]);

  const openUpdateBtradeStocksDialog = useCallback(() => {
    setUpdateBtradeStocksDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [
      {
        id: "update-arts",
        label: "Імпорт артикулів",
        icon: ArrowDown,
        iconColor: "blue",
        variant: "default",
        onClick: () => navigate("/arts/update"),
      },
      {
        id: "export-arts",
        label: "Експорт артикулів",
        icon: FileSpreadsheet,
        iconColor: "emerald",
        variant: "default",
        onClick: handleExport,
      },
      {
        id: "export-arts-with-stocks",
        label: "Експорт з запасами",
        icon: FileSpreadsheet,
        iconColor: "emerald",
        variant: "default",
        onClick: handleExportWithStocks,
      },
    ];

    if (canUpdateBtradeStocks) {
      actions.push({
        id: "update-all-btrade-stocks",
        label: "Запустити фонове оновлення залишків",
        icon: Play,
        iconColor: "blue",
        variant: "default",
        onClick: openUpdateBtradeStocksDialog,
      });
    }

    if (canDelete) {
      actions.push({
        id: "delete-arts-without-latest-marker",
        label: "Актуалізувати артикули",
        icon: Trash2,
        iconColor: "red",
        variant: "destructive",
        onClick: openDeleteDialog,
      });
    }

    return actions;
  }, [
    canDelete,
    canUpdateBtradeStocks,
    handleExport,
    handleExportWithStocks,
    navigate,
    openDeleteDialog,
    openUpdateBtradeStocksDialog,
  ]);

  useRegisterHeaderActions(headerActions);

  return (
    <ArtsHeaderActionsView
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      updateBtradeStocksDialogOpen={updateBtradeStocksDialogOpen}
      onUpdateBtradeStocksDialogOpenChange={setUpdateBtradeStocksDialogOpen}
      canDelete={canDelete}
      canUpdateBtradeStocks={canUpdateBtradeStocks}
    />
  );
}
