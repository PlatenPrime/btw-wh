import { Dialog } from "@/components/ui/dialog";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { RunCompensatingSliceDialogView } from "@/modules/sku-analytics/components/dialogs/run-compensating-slice-dialog/RunCompensatingSliceDialogView";
import { useRunCompensatingSliceDialog } from "@/modules/sku-analytics/components/dialogs/run-compensating-slice-dialog/useRunCompensatingSliceDialog";
import { useEffect, useState } from "react";

interface RunCompensatingSliceDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function RunCompensatingSliceDialog({
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: RunCompensatingSliceDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [konkName, setKonkName] = useState("");

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const konksQuery = useKonksQuery();
  const konks = konksQuery.data?.data ?? [];

  const { isRunning, handleRun } = useRunCompensatingSliceDialog({
    onSuccess,
  });

  useEffect(() => {
    if (!open) {
      setKonkName("");
    }
  }, [open]);

  const handleRunAndClose = () => {
    const started = handleRun(konkName);
    if (started) {
      handleOpenChange(false);
    }
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <RunCompensatingSliceDialogView
        konkName={konkName}
        onKonkNameChange={setKonkName}
        konks={konks}
        isKonksLoading={konksQuery.isLoading}
        isRunning={isRunning}
        onRun={handleRunAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
