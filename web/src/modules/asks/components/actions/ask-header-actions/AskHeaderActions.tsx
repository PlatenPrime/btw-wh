import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { RoleType } from "@/constants/roles";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskHeaderActionsView } from "@/modules/asks/components/actions/ask-header-actions/AskHeaderActionsView";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { usePermission } from "@/modules/auth/hooks/usePermission";
import { Ban, SquareCheckBig, Trash } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

interface AskHeaderActionsProps {
  askData: AskDto;
}

export function AskHeaderActions({ askData }: AskHeaderActionsProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { hasRole } = useAuth();
  const { canDeleteResource } = usePermission();
  const canModerateAsk = hasRole(RoleType.EDITOR);
  const canDeleteAsk = canDeleteResource(askData.asker);

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
    const date = searchParams.get("date");
    navigate(date ? `/refiling/asks?date=${date}` : "/refiling/asks");
    toast.success("Запит успішно видалений");
  }, [navigate, searchParams]);

  const headerActions = useMemo<HeaderAction[]>(() => {
    const actions: HeaderAction[] = [];
    if (canModerateAsk) {
      actions.push(
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
      );
    }
    if (canDeleteAsk) {
      actions.push({
        id: "delete-ask",
        label: "Видалити запит",
        icon: Trash,
        iconColor: "red",
        variant: "destructive",
        onClick: openDeleteDialog,
      });
    }
    return actions;
  }, [
    canDeleteAsk,
    canModerateAsk,
    openCompleteDialog,
    openDeleteDialog,
    openRejectDialog,
  ]);

  useRegisterHeaderActions(headerActions);

  return (
    <AskHeaderActionsView
      askId={askData._id}
      artikul={askData.artikul}
      showModerationDialogs={canModerateAsk}
      showDeleteDialog={canDeleteAsk}
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

