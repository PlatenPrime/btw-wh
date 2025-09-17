import { useCompleteAskMutation } from "@/modules/asks/api/hooks/mutations/useCompleteAskMutation";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { CompleteAskDialog } from "@/modules/asks/components/dialogs/complete-ask-dialog/CompleteAskDialog";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { toast } from "sonner";

export function AskCompleteButton({ askData }: { askData: AskDto }) {
  const { user } = useAuth();
  const executeAskMutation = useCompleteAskMutation(askData._id);

  const handleExecuteAsk = async () => {
    if (!user) {
      toast.error("Користувач не авторизований");
      return;
    }

    try {
      await executeAskMutation.mutateAsync(user._id);
      console.log("Запит успішно виконано");
      toast.success("Запит успішно виконано");
    } catch (error) {
      toast.error("Помилка при виконанні запиту");
      console.error("Execute ask error:", error);
    }
  };

  return (
    <CompleteAskDialog
      handleExecuteAsk={handleExecuteAsk}
      isPending={executeAskMutation.isPending}
      artikul={askData.artikul}
    />
  );
}
