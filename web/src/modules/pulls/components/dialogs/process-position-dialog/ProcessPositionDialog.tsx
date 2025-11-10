import type { PullPosition } from "@/modules/pulls/api/types";
import { ProcessPositionDialogView } from "./ProcessPositionDialogView";

interface ProcessPositionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: PullPosition | null;
  pullTitle: string;
  dialogTitle: string | null;
  onProcess: (actualQuant: number, actualBoxes: number) => void;
  isProcessing: boolean;
}

export function ProcessPositionDialog({
  open,
  onOpenChange,
  position,
  pullTitle,
  dialogTitle,
  onProcess,
  isProcessing,
}: ProcessPositionDialogProps) {
  const handleProcess = (actualQuant: number, actualBoxes: number) => {
    onProcess(actualQuant, actualBoxes);
  };

  return (
    <ProcessPositionDialogView
      open={open}
      onOpenChange={onOpenChange}
      position={position}
      pullTitle={pullTitle}
      dialogTitle={dialogTitle}
      onProcess={handleProcess}
      isProcessing={isProcessing}
    />
  );
}

