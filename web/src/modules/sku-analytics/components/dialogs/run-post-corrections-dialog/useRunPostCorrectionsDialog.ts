import { useStartApiTask } from "@/modules/apitasks";

interface UseRunPostCorrectionsDialogProps {
  onSuccess?: () => void;
}

interface RunPostCorrectionsParams {
  dateFrom: string;
  dateTo: string;
  apply: boolean;
}

interface UseRunPostCorrectionsDialogReturn {
  isRunning: boolean;
  /** Fire-and-forget: ставить задачу і одразу повертає, чи старт прийнято. */
  handleRun: (params: RunPostCorrectionsParams) => boolean;
}

export function useRunPostCorrectionsDialog({
  onSuccess,
}: UseRunPostCorrectionsDialogProps = {}): UseRunPostCorrectionsDialogReturn {
  const { startTask, isStarting } = useStartApiTask();

  const handleRun = ({
    dateFrom,
    dateTo,
    apply,
  }: RunPostCorrectionsParams): boolean => {
    if (isStarting || !dateFrom || !dateTo) {
      return false;
    }

    const modeLabel = apply ? "apply" : "dry-run";

    void startTask({
      kind: "sku-slices.post-corrections.run",
      params: { dateFrom, dateTo, apply },
      title: `Коригування залишків · ${dateFrom}…${dateTo} · ${modeLabel}`,
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
