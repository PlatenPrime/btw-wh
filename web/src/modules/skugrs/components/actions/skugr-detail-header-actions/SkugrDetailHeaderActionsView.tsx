import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { ClearSkugrSkusDialog } from "@/modules/skugrs/components/dialogs/clear-skugr-skus-dialog/ClearSkugrSkusDialog";
import { DeleteSkugrDialog } from "@/modules/skugrs/components/dialogs/delete-skugr-dialog/DeleteSkugrDialog";
import { DeleteSkugrWithSkusDialog } from "@/modules/skugrs/components/dialogs/delete-skugr-with-skus-dialog/DeleteSkugrWithSkusDialog";
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
  showFillDialog: boolean;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  clearSkusDialogOpen: boolean;
  onClearSkusDialogOpenChange: (open: boolean) => void;
  deleteWithSkusDialogOpen: boolean;
  onDeleteWithSkusDialogOpenChange: (open: boolean) => void;
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
  showFillDialog,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  clearSkusDialogOpen,
  onClearSkusDialogOpenChange,
  deleteWithSkusDialogOpen,
  onDeleteWithSkusDialogOpenChange,
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
      {showFillDialog ? (
        <FillSkugrSkusDialog
          skugrId={skugr._id}
          konkName={skugr.konkName}
          open={fillDialogOpen}
          onOpenChange={onFillDialogOpenChange}
        />
      ) : null}
      <DeleteSkugrDialog
        skugr={skugr}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
      <ClearSkugrSkusDialog
        skugrId={skugr._id}
        skugrTitle={skugr.title}
        open={clearSkusDialogOpen}
        onOpenChange={onClearSkusDialogOpenChange}
      />
      <DeleteSkugrWithSkusDialog
        skugrId={skugr._id}
        skugrTitle={skugr.title}
        open={deleteWithSkusDialogOpen}
        onOpenChange={onDeleteWithSkusDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}
