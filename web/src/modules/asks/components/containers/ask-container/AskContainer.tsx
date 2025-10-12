import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { useCompleteAskMutation } from "@/modules/asks/api/hooks/mutations/useCompleteAskMutation";
import { useDeleteAskMutation } from "@/modules/asks/api/hooks/mutations/useDeleteAskMutation";
import { useRejectAskMutation } from "@/modules/asks/api/hooks/mutations/useRejectAskMutation";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskContainerView } from "@/modules/asks/components/containers/ask-container/AskContainerView";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { Ban, SquareCheckBig, Trash } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface AskContainerProps {
  askData: AskDto;
}

export function AskContainer({ askData }: AskContainerProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Состояния для диалогов
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Мутации
  const completeAskMutation = useCompleteAskMutation(askData._id);
  const rejectAskMutation = useRejectAskMutation(askData._id);
  const deleteAskMutation = useDeleteAskMutation(askData._id);

  // Обработчики
  const handleCompleteAsk = async () => {
    if (!user) {
      toast.error("Користувач не авторизований");
      return;
    }

    try {
      await completeAskMutation.mutateAsync(user._id);
      toast.success("Запит успішно виконано");
    } catch (error) {
      toast.error("Помилка при виконанні запиту");
      console.error("Complete ask error:", error);
    }
  };

  const handleRejectAsk = async () => {
    if (!user) {
      toast.error("Користувач не авторизований");
      return;
    }

    try {
      await rejectAskMutation.mutateAsync(user._id);
      toast.success("На запит відмовлено");
    } catch (error) {
      toast.error("Помилка при відмові на запит");
      console.error("Reject ask error:", error);
    }
  };

  const handleDeleteAsk = async () => {
    try {
      await deleteAskMutation.mutateAsync();
      navigate("/refiling/asks");
      toast.success("Запит успішно видалений");
    } catch (error) {
      toast.error("Помилка при видаленні запиту");
      console.error("Delete ask error:", error);
    }
  };

  // Регистрируем действия в header меню
  useRegisterHeaderActions([
    {
      id: "complete-ask",
      label: "Виконати запит",
      icon: SquareCheckBig,
      iconColor: "emerald",
      variant: "default",
      onClick: () => setCompleteDialogOpen(true),
    },
    {
      id: "reject-ask",
      label: "Відмовити на запит",
      icon: Ban,
      iconColor: "rose",
      variant: "destructive",
      onClick: () => setRejectDialogOpen(true),
    },
    {
      id: "delete-ask",
      label: "Видалити запит",
      icon: Trash,
      iconColor: "red",
      variant: "destructive",
      onClick: () => setDeleteDialogOpen(true),
    },
  ]);

  return (
    <AskContainerView
      askData={askData}
      // Complete dialog props
      completeDialogOpen={completeDialogOpen}
      setCompleteDialogOpen={setCompleteDialogOpen}
      handleCompleteAsk={handleCompleteAsk}
      completeAskPending={completeAskMutation.isPending}
      // Reject dialog props
      rejectDialogOpen={rejectDialogOpen}
      setRejectDialogOpen={setRejectDialogOpen}
      handleRejectAsk={handleRejectAsk}
      rejectAskPending={rejectAskMutation.isPending}
      // Delete dialog props
      deleteDialogOpen={deleteDialogOpen}
      setDeleteDialogOpen={setDeleteDialogOpen}
      handleDeleteAsk={handleDeleteAsk}
      deleteAskPending={deleteAskMutation.isPending}
    />
  );
}
