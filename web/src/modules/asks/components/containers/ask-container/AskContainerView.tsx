import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDetailsCard } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCard";
import { AskEvents } from "@/modules/asks/components/containers/ask-container/components/ask-events/AskEvents.tsx";
import { AskPosesByArtikulContainer } from "@/modules/asks/components/containers/ask-poses-by-artikul-container";
import { AskPullPositionsContainer } from "@/modules/asks/components/containers/ask-pull-positions-container";
import { CompleteAskDialog } from "@/modules/asks/components/dialogs/complete-ask-dialog/CompleteAskDialog";
import { DeleteAskDialog } from "@/modules/asks/components/dialogs/delete-ask-dialog/DeleteAskDialog";
import { RejectAskDialog } from "@/modules/asks/components/dialogs/reject-ask-dialog/RejectAskDialog";
import { memo } from "react";

interface AskContainerViewProps {
  askData: AskDto;
  // Complete dialog props
  completeDialogOpen: boolean;
  setCompleteDialogOpen: (open: boolean) => void;
  handleCompleteAskSuccess: () => void;
  // Reject dialog props
  rejectDialogOpen: boolean;
  setRejectDialogOpen: (open: boolean) => void;
  handleRejectAskSuccess: () => void;
  // Delete dialog props
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  handleDeleteAskSuccess: () => void;
}

export const AskContainerView = memo(function AskContainerView({
  askData,
  completeDialogOpen,
  setCompleteDialogOpen,
  handleCompleteAskSuccess,
  rejectDialogOpen,
  setRejectDialogOpen,
  handleRejectAskSuccess,
  deleteDialogOpen,
  setDeleteDialogOpen,
  handleDeleteAskSuccess,
}: AskContainerViewProps) {
  return (
    <section className="grid gap-4">
      <Wrapper> <AskDetailsCard askData={askData} /></Wrapper>
     
      <Wrapper> <AskEvents
        events={askData.events ?? []}
        pullQuant={askData.pullQuant}
        pullBox={askData.pullBox}
        pullBoxes={askData.pullBoxes}
      /></Wrapper>

      {/* Позиции для снятия */}
      {askData.artikul && <Wrapper> <AskPullPositionsContainer askId={askData._id} /></Wrapper>}

      {/* Позиции по артикулу */}
      {askData.artikul && (
        <Wrapper> <AskPosesByArtikulContainer
          artikul={askData.artikul}
          askId={askData._id}
        /></Wrapper>
      )}

      {/* Диалоги вне dropdown для избежания конфликта фокуса */}
      <CompleteAskDialog
        askId={askData._id}
        artikul={askData.artikul}
        open={completeDialogOpen}
        onOpenChange={setCompleteDialogOpen}
        onSuccess={handleCompleteAskSuccess}
      />
      <RejectAskDialog
        askId={askData._id}
        artikul={askData.artikul}
        open={rejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        onSuccess={handleRejectAskSuccess}
      />
      <DeleteAskDialog
        askId={askData._id}
        artikul={askData.artikul}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onSuccess={handleDeleteAskSuccess}
      />
    </section>
  );
});
