import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskContainerView } from "@/modules/asks/components/containers/ask-container/AskContainerView";
import { Ban, SquareCheckBig, Trash } from "lucide-react";
import { useState } from "react";
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
  const handleCompleteAskSuccess = () => {
    toast.success("Запит успішно виконано");
  };

  const handleRejectAskSuccess = () => {
    toast.success("На запит відмовлено");
  };

  const handleDeleteAskSuccess = () => {
    navigate("/refiling/asks");
    toast.success("Запит успішно видалений");
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
      variant: "super-destructive",
      onClick: () => setDeleteDialogOpen(true),
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
