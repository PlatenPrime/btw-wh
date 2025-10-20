import { Container } from "@/components/shared/containers/Container";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDetailsCard } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCard";
import { AskActions } from "@/modules/asks/components/containers/ask-container/components/ask-actions/AskActions.tsx";
import { AskPosesByArtikulContainer } from "@/modules/asks/components/containers/ask-poses-by-artikul-container";
import { CompleteAskDialog } from "@/modules/asks/components/dialogs/complete-ask-dialog/CompleteAskDialog";
import { DeleteAskDialog } from "@/modules/asks/components/dialogs/delete-ask-dialog/DeleteAskDialog";
import { RejectAskDialog } from "@/modules/asks/components/dialogs/reject-ask-dialog/RejectAskDialog";

interface AskContainerViewProps {
  askData: AskDto;
  // Complete dialog props
  completeDialogOpen: boolean;
  setCompleteDialogOpen: (open: boolean) => void;
  handleCompleteAsk: () => Promise<void>;
  completeAskPending: boolean;
  // Reject dialog props
  rejectDialogOpen: boolean;
  setRejectDialogOpen: (open: boolean) => void;
  handleRejectAsk: () => Promise<void>;
  rejectAskPending: boolean;
  // Delete dialog props
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  handleDeleteAsk: () => Promise<void>;
  deleteAskPending: boolean;
}

export function AskContainerView({
  askData,
  completeDialogOpen,
  setCompleteDialogOpen,
  handleCompleteAsk,
  completeAskPending,
  rejectDialogOpen,
  setRejectDialogOpen,
  handleRejectAsk,
  rejectAskPending,
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleDeleteAsk,
  deleteAskPending,
}: AskContainerViewProps) {
  return (
    <section className="grid gap-2">
      <Container className="grid gap-2 lg:grid-cols-2">
        <AskDetailsCard askData={askData} />
        <AskActions actions={askData.actions} />
      </Container>

      {/* Позиции по артикулу */}
      {askData.artikul && (
        <AskPosesByArtikulContainer
          artikul={askData.artikul}
          askId={askData._id}
        />
      )}

      {/* Диалоги вне dropdown для избежания конфликта фокуса */}
      <CompleteAskDialog
        handleExecuteAsk={handleCompleteAsk}
        isPending={completeAskPending}
        artikul={askData.artikul}
        open={completeDialogOpen}
        onOpenChange={setCompleteDialogOpen}
      />
      <RejectAskDialog
        handleRejectAsk={handleRejectAsk}
        isPending={rejectAskPending}
        artikul={askData.artikul}
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
      />
      <DeleteAskDialog
        handleDeleteAsk={handleDeleteAsk}
        isPending={deleteAskPending}
        artikul={askData.artikul}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
      />
    </section>
  );
}
