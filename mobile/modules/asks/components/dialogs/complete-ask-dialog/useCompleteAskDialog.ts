import { useCompleteAskMutation } from "@/modules/asks/api/hooks/mutations/useCompleteAskMutation";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";

interface UseCompleteAskDialogProps {
  askId: string;
  onSuccess?: () => void;
}

interface UseCompleteAskDialogReturn {
  isCompleting: boolean;
  handleComplete: () => Promise<void>;
}

export function useCompleteAskDialog({
  askId,
  onSuccess,
}: UseCompleteAskDialogProps): UseCompleteAskDialogReturn {
  const { user } = useAuth();
  const mutation = useCompleteAskMutation(askId);

  const isCompleting = mutation.isPending;

  const handleComplete = async () => {
    if (isCompleting || !user) {
      return;
    }

    try {
      await mutation.mutateAsync(user._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка виконання запиту:", error);
    }
  };

  return {
    isCompleting,
    handleComplete,
  };
}

