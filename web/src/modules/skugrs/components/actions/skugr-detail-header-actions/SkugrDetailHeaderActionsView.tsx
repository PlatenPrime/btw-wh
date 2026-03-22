import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { FillSkugrSkusDialog } from "@/modules/skugrs/components/dialogs/fill-skugr-skus-dialog/FillSkugrSkusDialog";
import { UpdateSkugrDialog } from "@/modules/skugrs/components/dialogs/update-skugr-dialog/UpdateSkugrDialog";

interface SkugrDetailHeaderActionsViewProps {
  skugr: SkugrPageDto;
  editDialogOpen: boolean;
  onEditDialogOpenChange: (open: boolean) => void;
  fillDialogOpen: boolean;
  onFillDialogOpenChange: (open: boolean) => void;
}

export function SkugrDetailHeaderActionsView({
  skugr,
  editDialogOpen,
  onEditDialogOpenChange,
  fillDialogOpen,
  onFillDialogOpenChange,
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
    </>
  );
}
