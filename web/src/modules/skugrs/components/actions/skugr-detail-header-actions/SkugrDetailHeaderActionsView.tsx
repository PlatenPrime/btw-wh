import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { DeleteSkugrDialog } from "@/modules/skugrs/components/dialogs/delete-skugr-dialog/DeleteSkugrDialog";
import { FillSkugrSkusDialog } from "@/modules/skugrs/components/dialogs/fill-skugr-skus-dialog/FillSkugrSkusDialog";
import { UpdateSkugrDialog } from "@/modules/skugrs/components/dialogs/update-skugr-dialog/UpdateSkugrDialog";

interface SkugrDetailHeaderActionsViewProps {
  skugr: SkugrPageDto;
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
