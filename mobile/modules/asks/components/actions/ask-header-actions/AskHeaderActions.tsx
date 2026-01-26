import type { HeaderAction } from "@/components/layout/header";
import { useRegisterHeaderActions } from "@/components/layout/header";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskHeaderActionsView } from "@/modules/asks/components/actions/ask-header-actions/AskHeaderActionsView";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "expo-router";

interface AskHeaderActionsProps {
  askData: AskDto;
}

export function AskHeaderActions({ askData }: AskHeaderActionsProps) {
  const router = useRouter();
  const [completeDialogOpen, setCompleteDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openCompleteDialog = useCallback(() => {
    setCompleteDialogOpen(true);
  }, []);

  const openRejectDialog = useCallback(() => {
    setRejectDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const onCompleteSuccess = useCallback(() => {
    setCompleteDialogOpen(false);
  }, []);

  const onRejectSuccess = useCallback(() => {
    setRejectDialogOpen(false);
  }, []);

  const onDeleteSuccess = useCallback(() => {
    router.back();
    setDeleteDialogOpen(false);
  }, [router]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "complete-ask",
        label: "Виконати запит",
        icon: "check-circle",
        iconColor: "emerald",
        textColor: "emerald",
        variant: "default",
        onClick: openCompleteDialog,
      },
      {
        id: "reject-ask",
        label: "Відмовити на запит",
        icon: "cancel",
        iconColor: "rose",
        textColor: "rose",
        variant: "destructive",
        onClick: openRejectDialog,
      },
      {
        id: "delete-ask",
        label: "Видалити запит",
        icon: "delete",
        iconColor: "red",
        textColor: "red",
        variant: "destructive",
        onClick: openDeleteDialog,
      },
    ],
    [openCompleteDialog, openDeleteDialog, openRejectDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <AskHeaderActionsView
      askId={askData._id}
      artikul={askData.artikul}
      completeDialogOpen={completeDialogOpen}
      onCompleteDialogOpenChange={setCompleteDialogOpen}
      rejectDialogOpen={rejectDialogOpen}
      onRejectDialogOpenChange={setRejectDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
      onCompleteSuccess={onCompleteSuccess}
      onRejectSuccess={onRejectSuccess}
      onDeleteSuccess={onDeleteSuccess}
    />
  );
}

