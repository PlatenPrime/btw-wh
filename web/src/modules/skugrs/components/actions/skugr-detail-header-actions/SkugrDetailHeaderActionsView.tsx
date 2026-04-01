import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { DeleteSkugrDialog } from "@/modules/skugrs/components/dialogs/delete-skugr-dialog/DeleteSkugrDialog";
import { FillSkugrSkusDialog } from "@/modules/skugrs/components/dialogs/fill-skugr-skus-dialog/FillSkugrSkusDialog";
import { SkugrSalesExcelDialog } from "@/modules/skugrs/components/dialogs/skugr-sales-excel-dialog";
import { SkugrSliceExcelDialog } from "@/modules/skugrs/components/dialogs/skugr-slice-excel-dialog";
import { UpdateSkugrDialog } from "@/modules/skugrs/components/dialogs/update-skugr-dialog/UpdateSkugrDialog";

interface SkugrDetailHeaderActionsViewProps {
  skugr: SkugrPageDto;
  sliceExcelDialogOpen: boolean;
  onSliceExcelDialogOpenChange: (open: boolean) => void;
  salesExcelDialogOpen: boolean;
  onSalesExcelDialogOpenChange: (open: boolean) => void;
  editDialogOpen: boolean;
  onEditDialogOpenChange: (open: boolean) => void;
  fillDialogOpen: boolean;
  onFillDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function SkugrDetailHeaderActionsView({
  skugr,
  sliceExcelDialogOpen,
  onSliceExcelDialogOpenChange,
  salesExcelDialogOpen,
  onSalesExcelDialogOpenChange,
  editDialogOpen,
  onEditDialogOpenChange,
  fillDialogOpen,
  onFillDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: SkugrDetailHeaderActionsViewProps) {
  return (
    <>
      <SkugrSliceExcelDialog
        skugrId={skugr._id}
        open={sliceExcelDialogOpen}
        onOpenChange={onSliceExcelDialogOpenChange}
      />
      <SkugrSalesExcelDialog
        skugrId={skugr._id}
        open={salesExcelDialogOpen}
        onOpenChange={onSalesExcelDialogOpenChange}
      />
      <UpdateSkugrDialog
        skugr={skugr}
        open={editDialogOpen}
        onOpenChange={onEditDialogOpenChange}
      />
      <FillSkugrSkusDialog
        skugrId={skugr._id}
        konkName={skugr.konkName}
        open={fillDialogOpen}
        onOpenChange={onFillDialogOpenChange}
      />
      <DeleteSkugrDialog
        skugr={skugr}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}
