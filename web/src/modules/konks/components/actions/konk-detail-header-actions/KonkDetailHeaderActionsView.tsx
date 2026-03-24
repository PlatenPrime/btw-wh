import type { KonkDto } from "@/modules/konks/api/types";
import { DeleteKonkDialog } from "@/modules/konks/components/dialogs/delete-konk-dialog/DeleteKonkDialog";
import { KonkSalesExcelDialog } from "@/modules/konks/components/dialogs/konk-sales-excel-dialog/KonkSalesExcelDialog";
import { KonkSliceExcelDialog } from "@/modules/konks/components/dialogs/konk-slice-excel-dialog/KonkSliceExcelDialog";
import { UpdateKonkDialog } from "@/modules/konks/components/dialogs/update-konk-dialog/UpdateKonkDialog";

interface KonkDetailHeaderActionsViewProps {
  konk: KonkDto;
  updateDialogOpen: boolean;
  onUpdateDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
  sliceExcelDialogOpen: boolean;
  onSliceExcelDialogOpenChange: (open: boolean) => void;
  salesExcelDialogOpen: boolean;
  onSalesExcelDialogOpenChange: (open: boolean) => void;
}

export function KonkDetailHeaderActionsView({
  konk,
  updateDialogOpen,
  onUpdateDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
  sliceExcelDialogOpen,
  onSliceExcelDialogOpenChange,
  salesExcelDialogOpen,
  onSalesExcelDialogOpenChange,
}: KonkDetailHeaderActionsViewProps) {
  return (
    <>
      <KonkSliceExcelDialog
        konk={konk}
        open={sliceExcelDialogOpen}
        onOpenChange={onSliceExcelDialogOpenChange}
      />

      <KonkSalesExcelDialog
        konk={konk}
        open={salesExcelDialogOpen}
        onOpenChange={onSalesExcelDialogOpenChange}
      />

      <UpdateKonkDialog
        konk={konk}
        open={updateDialogOpen}
        onOpenChange={onUpdateDialogOpenChange}
      />

      <DeleteKonkDialog
        konk={konk}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}
