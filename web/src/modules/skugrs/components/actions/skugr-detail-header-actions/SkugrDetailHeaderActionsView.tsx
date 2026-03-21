import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { FillSkugrSkusDialog } from "@/modules/skugrs/components/dialogs/fill-skugr-skus-dialog/FillSkugrSkusDialog";

interface SkugrDetailHeaderActionsViewProps {
  skugr: SkugrPageDto;
  fillDialogOpen: boolean;
  onFillDialogOpenChange: (open: boolean) => void;
}

export function SkugrDetailHeaderActionsView({
  skugr,
  fillDialogOpen,
  onFillDialogOpenChange,
}: SkugrDetailHeaderActionsViewProps) {
  return (
    <FillSkugrSkusDialog
      skugrId={skugr._id}
      konkName={skugr.konkName}
      open={fillDialogOpen}
      onOpenChange={onFillDialogOpenChange}
    />
  );
}
