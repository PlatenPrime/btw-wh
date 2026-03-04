import type { EnrichedAnalogDto } from "@/modules/analogs/api/types";
import { ComparisonExcelDialog } from "@/modules/analogs/components/dialogs/comparison-excel-dialog";
import { DeleteAnalogDialog } from "@/modules/analogs/components/dialogs/delete-analog-dialog";
import { UpdateAnalogDialog } from "@/modules/analogs/components/dialogs/update-analog-dialog";

interface AnalogDetailHeaderActionsViewProps {
  analog: EnrichedAnalogDto;
  updateDialogOpen: boolean;
  onUpdateDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  comparisonExcelDialogOpen: boolean;
  onComparisonExcelDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function AnalogDetailHeaderActionsView({
  analog,
  updateDialogOpen,
  onUpdateDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  comparisonExcelDialogOpen,
  onComparisonExcelDialogOpenChange,
  onDeleteSuccess,
}: AnalogDetailHeaderActionsViewProps) {
  return (
    <>
      <ComparisonExcelDialog
        analog={analog}
        open={comparisonExcelDialogOpen}
        onOpenChange={onComparisonExcelDialogOpenChange}
      />

      <UpdateAnalogDialog
        analog={analog}
        open={updateDialogOpen}
        onOpenChange={onUpdateDialogOpenChange}
      />

      <DeleteAnalogDialog
        analog={analog}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}
