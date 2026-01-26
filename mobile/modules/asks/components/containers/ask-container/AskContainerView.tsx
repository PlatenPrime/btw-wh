import { ScrollView, View, RefreshControl } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDetailsCard } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCard";
import { AskEvents } from "@/modules/asks/components/containers/ask-container/components/ask-events/AskEvents";
import { AskPullPositionsContainer } from "@/modules/asks/components/containers/ask-pull-positions-container/AskPullPositionsContainer";
import { AskPosesByArtikulContainer } from "@/modules/asks/components/containers/ask-poses-by-artikul-container/AskPosesByArtikulContainer";
import { ThemedVStack } from "@/components/themed";

interface AskContainerViewProps {
  askData: AskDto;
  // Refresh props
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function AskContainerView({
  askData,
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
          {askData.artikul ? (
            <AskPullPositionsContainer askId={askData._id} />
          ) : null}

          {/* Позиции по артикулу */}
          {askData.artikul ? (
            <AskPosesByArtikulContainer
              artikul={askData.artikul}
              askId={askData._id}
            />
          ) : null}
        </ThemedVStack>
      </ScrollView>
    </ThemedView>
  );
}

