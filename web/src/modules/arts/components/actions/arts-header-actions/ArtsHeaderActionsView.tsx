import { DeleteArtsWithoutLatestMarkerDialog } from "@/modules/arts/components/dialogs/delete-arts-without-latest-marker-dialog/DeleteArtsWithoutLatestMarkerDialog";
import { UpdateAllBtradeStocksDialog } from "@/modules/arts/components/dialogs/update-all-btrade-stocks-dialog/UpdateAllBtradeStocksDialog";

interface ArtsHeaderActionsViewProps {
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  updateBtradeStocksDialogOpen: boolean;
  onUpdateBtradeStocksDialogOpenChange: (open: boolean) => void;
  canDelete: boolean;
  canUpdateBtradeStocks: boolean;
}

export function ArtsHeaderActionsView({
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  updateBtradeStocksDialogOpen,
  onUpdateBtradeStocksDialogOpenChange,
  canDelete,
  canUpdateBtradeStocks,
}: ArtsHeaderActionsViewProps) {
  return (
    <>
      {canDelete ? (
        <DeleteArtsWithoutLatestMarkerDialog
          open={deleteDialogOpen}
          onOpenChange={onDeleteDialogOpenChange}
        />
      ) : null}

      {canUpdateBtradeStocks ? (
        <UpdateAllBtradeStocksDialog
          open={updateBtradeStocksDialogOpen}
          onOpenChange={onUpdateBtradeStocksDialogOpenChange}
        />
      ) : null}
    </>
  );
}

