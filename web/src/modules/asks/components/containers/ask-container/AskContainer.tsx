import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskContainerView } from "@/modules/asks/components/containers/ask-container/AskContainerView";
import { Ban, SquareCheckBig, Trash } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface AskContainerProps {
  askData: AskDto;
}

export function AskContainer({ askData }: AskContainerProps) {
  const navigate = useNavigate();

  // Состояния для диалогов
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Обработчики успеха
  const handleCompleteAskSuccess = useCallback(() => {
    toast.success("Запит успішно виконано");
  }, []);

  const handleRejectAskSuccess = useCallback(() => {
    toast.success("На запит відмовлено");
  }, []);

  const handleDeleteAskSuccess = useCallback(() => {
    navigate("/refiling/asks");
    toast.success("Запит успішно видалений");
  }, [navigate]);

  const handleCompleteClick = useCallback(() => {
    setCompleteDialogOpen(true);
  }, []);

  const handleRejectClick = useCallback(() => {
    setRejectDialogOpen(true);
  }, []);

  const handleDeleteClick = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  // Регистрируем действия в header меню
  useRegisterHeaderActions([
    {
      id: "complete-ask",
      label: "Виконати запит",
      icon: SquareCheckBig,
      iconColor: "emerald",
      variant: "default",
      onClick: handleCompleteClick,
    },
    {
      id: "reject-ask",
      label: "Відмовити на запит",
      icon: Ban,
      iconColor: "rose",
      variant: "destructive",
      onClick: handleRejectClick,
    },
    {
      id: "delete-ask",
      label: "Видалити запит",
      icon: Trash,
      iconColor: "red",
      variant: "destructive",
      onClick: handleDeleteClick,
    },
  ]);

  return (
    <AskContainerView
      askData={askData}
      // Complete dialog props
      completeDialogOpen={completeDialogOpen}
      setCompleteDialogOpen={setCompleteDialogOpen}
      handleCompleteAskSuccess={handleCompleteAskSuccess}
      // Reject dialog props
      rejectDialogOpen={rejectDialogOpen}
      setRejectDialogOpen={setRejectDialogOpen}
      handleRejectAskSuccess={handleRejectAskSuccess}
      // Delete dialog props
      deleteDialogOpen={deleteDialogOpen}
      setDeleteDialogOpen={setDeleteDialogOpen}
      handleDeleteAskSuccess={handleDeleteAskSuccess}
    />
  );
}
