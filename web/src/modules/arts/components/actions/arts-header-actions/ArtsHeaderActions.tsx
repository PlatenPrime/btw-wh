import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useRole } from "@/modules/auth/hooks/useRole";
import { ArtsHeaderActionsView } from "@/modules/arts/components/actions/arts-header-actions/ArtsHeaderActionsView";
import { handleExportArtsWithStocks } from "@/modules/arts/utils/handle-export-arts-with-stocks/handleExportArtsWithStocks";
import { handleExportArts } from "@/modules/arts/utils/handle-export-arts/handleExportArts";
import { FileSpreadsheet, RefreshCw, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

export function ArtsHeaderActions() {
  const { isPrime, isAdmin } = useRole();
  const canDelete = isPrime();
  const canUpdateBtradeStocks = isAdmin();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [updateBtradeStocksDialogOpen, setUpdateBtradeStocksDialogOpen] =
    useState(false);

  const handleExport = useCallback(() => {
    handleExportArts();
  }, []);

  const handleExportWithStocks = useCallback(() => {
    handleExportArtsWithStocks();
  }, []);

  const openUpdateBtradeStocksDialog = useCallback(() => {
    setUpdateBtradeStocksDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [
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
        label: "Оновити залишки Btrade",
        icon: RefreshCw,
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

