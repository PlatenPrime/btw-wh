import { ScrollView, View, RefreshControl } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDetailsCard } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCard";
import { AskEvents } from "@/modules/asks/components/containers/ask-container/components/ask-events/AskEvents";
import { AskPullPositionsContainer } from "@/modules/asks/components/containers/ask-pull-positions-container/AskPullPositionsContainer";
import { AskPosesByArtikulContainer } from "@/modules/asks/components/containers/ask-poses-by-artikul-container/AskPosesByArtikulContainer";
import { ThemedVStack } from "@/components/themed";
import { CompleteAskDialog } from "@/modules/asks/components/dialogs/complete-ask-dialog/CompleteAskDialog";
import { RejectAskDialog } from "@/modules/asks/components/dialogs/reject-ask-dialog/RejectAskDialog";
import { DeleteAskDialog } from "@/modules/asks/components/dialogs/delete-ask-dialog/DeleteAskDialog";

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
  // Refresh props
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function AskContainerView({
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
  refreshing = false,
  onRefresh,
}: AskContainerViewProps) {
  return (
    <ThemedView className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 p-4"
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
      >
        <ThemedVStack className="gap-4">
          {/* Детали ask */}
          <AskDetailsCard askData={askData} />

          {/* События ask */}
          <AskEvents
            events={askData.events ?? []}
            pullQuant={askData.pullQuant}
            pullBox={askData.pullBox}
            pullBoxes={askData.pullBoxes}
          />

          {/* Позиции для снятия */}
          {askData.artikul && (
            <AskPullPositionsContainer askId={askData._id} />
          )}

          {/* Позиции по артикулу */}
          {askData.artikul && (
            <AskPosesByArtikulContainer
              artikul={askData.artikul}
              askId={askData._id}
            />
          )}
        </ThemedVStack>
      </ScrollView>

      {/* Диалоги */}
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
    </ThemedView>
  );
}

