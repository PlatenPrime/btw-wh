import { useDeleteAskMutation } from "@/modules/asks/api/hooks/mutations/useDeleteAskMutation";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { AskDeleteButtonView } from "./AskDeleteButtonView";

export function AskDeleteButton({ askData }: { askData: AskDto }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const deleteAskMutation = useDeleteAskMutation(askData._id);

  const handleDeleteAsk = async () => {
    try {
      await deleteAskMutation.mutateAsync();
      toast.success("Запит успішно видалений");
      setOpen(false);
      navigate("/refiling/asks");
    } catch (error) {
      toast.error("Помилка при видаленні запиту");
      console.error("Delete ask error:", error);
    }
  };

  return (
    <div>
      <AskDeleteButtonView
        askData={askData}
        handleDeleteAsk={handleDeleteAsk}
        isPending={deleteAskMutation.isPending}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
