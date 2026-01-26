import { CompleteAskDialog } from "@/modules/asks/components/dialogs/complete-ask-dialog/CompleteAskDialog";
import { DeleteAskDialog } from "@/modules/asks/components/dialogs/delete-ask-dialog/DeleteAskDialog";
import { RejectAskDialog } from "@/modules/asks/components/dialogs/reject-ask-dialog/RejectAskDialog";

interface AskHeaderActionsViewProps {
  askId: string;
  artikul: string;
  completeDialogOpen: boolean;
  onCompleteDialogOpenChange: (open: boolean) => void;
  rejectDialogOpen: boolean;
  onRejectDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onCompleteSuccess: () => void;
  onRejectSuccess: () => void;
  onDeleteSuccess: () => void;
}

export function AskHeaderActionsView({
  askId,
  artikul,
  completeDialogOpen,
  onCompleteDialogOpenChange,
  rejectDialogOpen,
  onRejectDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onCompleteSuccess,
  onRejectSuccess,
  onDeleteSuccess,
}: AskHeaderActionsViewProps) {
  return (
    <>
      <CompleteAskDialog
        askId={askId}
        artikul={artikul}
        open={completeDialogOpen}
        onOpenChange={onCompleteDialogOpenChange}
        onSuccess={onCompleteSuccess}
      />
      <RejectAskDialog
        askId={askId}
        artikul={artikul}
        open={rejectDialogOpen}
        onOpenChange={onRejectDialogOpenChange}
        onSuccess={onRejectSuccess}
      />
      <DeleteAskDialog
        askId={askId}
        artikul={artikul}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}

