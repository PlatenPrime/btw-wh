import { useRunCompensatingSliceMutation } from "@/modules/sku-analytics/api/hooks/mutations/useRunCompensatingSliceMutation";
import { toast } from "sonner";

interface UseRunCompensatingSliceDialogProps {
  onSuccess?: () => void;
}

interface UseRunCompensatingSliceDialogReturn {
  isRunning: boolean;
  /** Fire-and-forget: стартує scrape і одразу повертає, чи старт прийнято. */
  handleRun: (konkName: string) => boolean;
}

export function useRunCompensatingSliceDialog({
  onSuccess,
}: UseRunCompensatingSliceDialogProps = {}): UseRunCompensatingSliceDialogReturn {
  const mutation = useRunCompensatingSliceMutation();

  const isRunning = mutation.isPending;

  const handleRun = (konkName: string): boolean => {
    const trimmed = konkName.trim();
    if (isRunning || !trimmed) {
      return false;
    }

    toast.info("Компенсуючий зріз запущено", {
      description: `${trimmed}: опитування може зайняти кілька хвилин. Результат з'явиться в сповіщенні.`,
    });

    mutation.mutate(trimmed, {
      onSuccess: () => {
        onSuccess?.();
      },
    });

    return true;
  };

  return {
    isRunning,
    handleRun,
  };
}
