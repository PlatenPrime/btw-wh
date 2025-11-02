import type { IPullPosition } from "@/modules/pulls/api/types/dto";
import { ProcessPositionDialogView } from "./ProcessPositionDialogView";

interface ProcessPositionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  position: IPullPosition;
  onProcess: (position: IPullPosition, actualQuant: number) => void;
  isProcessing: boolean;
}

export function ProcessPositionDialog({
  open,
  onOpenChange,
  position,
  onProcess,
  isProcessing,
}: ProcessPositionDialogProps) {
  const handleProcess = (actualQuant: number) => {
    onProcess(position, actualQuant);
  };

  return (
    <ProcessPositionDialogView
      open={open}
      onOpenChange={onOpenChange}
      position={position}
      onProcess={handleProcess}
      isProcessing={isProcessing}
    />
  );
}

