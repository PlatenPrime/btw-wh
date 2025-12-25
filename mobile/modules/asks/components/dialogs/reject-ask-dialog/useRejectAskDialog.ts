import { useRejectAskMutation } from "@/modules/asks/api/hooks/mutations/useRejectAskMutation";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";

interface UseRejectAskDialogProps {
  askId: string;
  onSuccess?: () => void;
}

interface UseRejectAskDialogReturn {
  isRejecting: boolean;
  handleReject: () => Promise<void>;
}

export function useRejectAskDialog({
  askId,
  onSuccess,
}: UseRejectAskDialogProps): UseRejectAskDialogReturn {
  const { user } = useAuth();
  const mutation = useRejectAskMutation(askId);

  const isRejecting = mutation.isPending;

  const handleReject = async () => {
    if (isRejecting || !user) {
      return;
    }

    try {
      await mutation.mutateAsync(user._id);
      onSuccess?.();
    } catch (error) {
      console.error("Помилка відмови на запит:", error);
    }
  };

  return {
    isRejecting,
    handleReject,
  };
}

