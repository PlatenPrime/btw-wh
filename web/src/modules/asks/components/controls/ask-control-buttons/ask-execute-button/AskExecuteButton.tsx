import { useExecuteAskMutation } from "@/modules/asks/api/hooks/mutations/useExecuteAskMutation";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { ExecuteAskDialog } from "@/modules/asks/components/dialogs/execute-ask-dialog/ExecuteAskDialog";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { toast } from "sonner";

export function AskExecuteButton({ askData }: { askData: AskDto }) {
  const { user } = useAuth();
  const executeAskMutation = useExecuteAskMutation(askData._id);

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
    <ExecuteAskDialog
      handleExecuteAsk={handleExecuteAsk}
      isPending={executeAskMutation.isPending}
      artikul={askData.artikul}
    />
  );
}
