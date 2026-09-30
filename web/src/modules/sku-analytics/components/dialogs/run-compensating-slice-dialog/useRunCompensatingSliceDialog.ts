import { useStartApiTask } from "@/modules/apitasks";

interface UseRunCompensatingSliceDialogProps {
  onSuccess?: () => void;
}

interface UseRunCompensatingSliceDialogReturn {
  isRunning: boolean;
  /** Fire-and-forget: ставить задачу і одразу повертає, чи старт прийнято. */
  handleRun: (konkName: string) => boolean;
}

export function useRunCompensatingSliceDialog({
  onSuccess,
}: UseRunCompensatingSliceDialogProps = {}): UseRunCompensatingSliceDialogReturn {
  const { startTask, isStarting } = useStartApiTask();

  const handleRun = (konkName: string): boolean => {
    const trimmed = konkName.trim();
    if (isStarting || !trimmed) {
      return false;
    }

    void startTask({
      kind: "slice-compensation.run",
      params: { konkName: trimmed },
      title: `Компенсуючий зріз · ${trimmed}`,
    })
      .then((task) => {
        if (task) onSuccess?.();
      })
      .catch(() => {
        // toast у provider
      });

    return true;
  };

  return {
    isRunning: isStarting,
    handleRun,
  };
}
