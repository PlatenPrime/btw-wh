import { useRejectAskMutation } from "@/modules/asks/api/hooks/mutations/useRejectAskMutation";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { RejectAskDialog } from "@/modules/asks/components/dialogs/reject-ask-dialog/RejectAskDialog";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { toast } from "sonner";

export function AskRejectButton({ askData }: { askData: AskDto }) {
  const { user } = useAuth();
  const rejectAskMutation = useRejectAskMutation(askData._id);

  const handleRejectAsk = async () => {
    if (!user) {
      toast.error("Користувач не авторизований");
      return;
    }

    try {
      await rejectAskMutation.mutateAsync(user._id);
      console.log("Запит успішно відмінено");
      toast.success("Запит успішно відмінено");
    } catch (error) {
      toast.error("Помилка при відміні запиту");
      console.error("Reject ask error:", error);
    }
  };

  return (
    <RejectAskDialog
      handleRejectAsk={handleRejectAsk}
      isPending={rejectAskMutation.isPending}
      artikul={askData.artikul}
    />
  );
}
