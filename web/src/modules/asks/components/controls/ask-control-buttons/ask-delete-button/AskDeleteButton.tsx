import { useDeleteAskMutation } from "@/modules/asks/api/hooks/mutations/useDeleteAskMutation";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { DeleteAskDialog } from "@/modules/asks/components/dialogs/delete-ask-dialog/DeleteAskDialog";

export function AskDeleteButton({ askData }: { askData: AskDto }) {
  const navigate = useNavigate();
  const deleteAskMutation = useDeleteAskMutation(askData._id);

  const handleDeleteAsk = async () => {
    try {
      await deleteAskMutation.mutateAsync();
      console.log("Запит успішно видалений");
      navigate("/refiling/asks");
      toast.success("Запит успішно видалений");
    } catch (error) {
      toast.error("Помилка при видаленні запиту");
      console.error("Delete ask error:", error);
    }
  };

  return (
    <DeleteAskDialog
      handleDeleteAsk={handleDeleteAsk}
      isPending={deleteAskMutation.isPending}
      artikul={askData.artikul}
    />
  );
}
