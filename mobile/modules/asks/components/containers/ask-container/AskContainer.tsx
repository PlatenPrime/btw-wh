import { useRegisterHeaderActions } from "@/components/layout/header";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskContainerView } from "@/modules/asks/components/containers/ask-container/AskContainerView";
import { useState } from "react";
import { useRouter } from "expo-router";

interface AskContainerProps {
  askData: AskDto;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function AskContainer({
  askData,
  refreshing,
  onRefresh,
}: AskContainerProps) {
  const router = useRouter();

  // Состояния для диалогов
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Обработчики успеха
  const handleCompleteAskSuccess = () => {
    // В мобильной версии можно показать toast или обновить данные
    setCompleteDialogOpen(false);
  };

  const handleRejectAskSuccess = () => {
    setRejectDialogOpen(false);
  };

  const handleDeleteAskSuccess = () => {
    router.back();
    setDeleteDialogOpen(false);
  };

  // Регистрируем действия в header меню
  useRegisterHeaderActions([
    {
      id: "complete-ask",
      label: "Виконати запит",
      icon: "check-circle",
      iconColor: "emerald",
      textColor: "emerald",
      variant: "default",
      onClick: () => setCompleteDialogOpen(true),
    },
    {
      id: "reject-ask",
      label: "Відмовити на запит",
      icon: "cancel",
      iconColor: "rose",
      textColor: "rose",
      variant: "destructive",
      onClick: () => setRejectDialogOpen(true),
    },
    {
      id: "delete-ask",
      label: "Видалити запит",
      icon: "delete",
      iconColor: "red",
      textColor: "red",
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
      handleCompleteAskSuccess={handleCompleteAskSuccess}
      // Reject dialog props
      rejectDialogOpen={rejectDialogOpen}
      setRejectDialogOpen={setRejectDialogOpen}
      handleRejectAskSuccess={handleRejectAskSuccess}
      // Delete dialog props
      deleteDialogOpen={deleteDialogOpen}
      setDeleteDialogOpen={setDeleteDialogOpen}
      handleDeleteAskSuccess={handleDeleteAskSuccess}
      // Refresh props
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

