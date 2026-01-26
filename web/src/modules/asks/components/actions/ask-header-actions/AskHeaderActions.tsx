import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskHeaderActionsView } from "@/modules/asks/components/actions/ask-header-actions/AskHeaderActionsView";
import { Ban, SquareCheckBig, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

interface AskHeaderActionsProps {
  askData: AskDto;
}

export function AskHeaderActions({ askData }: AskHeaderActionsProps) {
  const navigate = useNavigate();

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
    toast.success("Запит успішно виконано");
  }, []);

  const onRejectSuccess = useCallback(() => {
    toast.success("На запит відмовлено");
  }, []);

  const onDeleteSuccess = useCallback(() => {
    navigate("/refiling/asks");
    toast.success("Запит успішно видалений");
  }, [navigate]);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "complete-ask",
        label: "Виконати запит",
        icon: SquareCheckBig,
        iconColor: "emerald",
        variant: "default",
        onClick: openCompleteDialog,
      },
      {
        id: "reject-ask",
        label: "Відмовити на запит",
        icon: Ban,
        iconColor: "rose",
        variant: "destructive",
        onClick: openRejectDialog,
      },
      {
        id: "delete-ask",
        label: "Видалити запит",
        icon: Trash,
        iconColor: "red",
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

