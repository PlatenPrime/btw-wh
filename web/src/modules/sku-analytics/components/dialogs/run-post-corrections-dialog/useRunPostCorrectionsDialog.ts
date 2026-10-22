import { useStartApiTask } from "@/modules/apitasks";

interface UseRunPostCorrectionsDialogProps {
  onSuccess?: () => void;
}

interface RunPostCorrectionsParams {
  dateFrom: string;
  dateTo: string;
  apply: boolean;
  /** Empty / omitted — full cron-like run without RTL band. */
  konkName?: string;
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
    konkName,
  }: RunPostCorrectionsParams): boolean => {
    if (isStarting || !dateFrom || !dateTo) {
      return false;
    }

    const trimmedKonk = konkName?.trim() ?? "";
    const modeLabel = apply ? "apply" : "dry-run";
    const scopeLabel = trimmedKonk || "all";

    const params: Record<string, unknown> = { dateFrom, dateTo, apply };
    if (trimmedKonk) {
      params.konkName = trimmedKonk;
    }

    void startTask({
      kind: "sku-slices.post-corrections.run",
      params,
      title: `Коригування залишків · ${scopeLabel} · ${dateFrom}…${dateTo} · ${modeLabel}`,
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
