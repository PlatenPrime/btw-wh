import { ThemedBox, ThemedVStack } from "@/components/themed";
import { ThemedView } from "@/components/themed/themed-view";
import { AskDetailsCardSkeleton } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCardSkeleton";
import { AskEventsSkeleton } from "@/modules/asks/components/containers/ask-container/components/ask-events/AskEventsSkeleton";
import { AskPullPositionsContainerSkeleton } from "@/modules/asks/components/containers/ask-pull-positions-container/AskPullPositionsContainerSkeleton";
import { PosesByArtikulContainerSkeleton } from "@/modules/poses/components/containers/poses-by-artikul-container/PosesByArtikulContainerSkeleton";
import { ScrollView } from "react-native";

export function AskContainerSkeleton() {
  return (
    <ThemedView className="flex-1">
      <ScrollView className="flex-1" contentContainerClassName="gap-4 p-4">
        <ThemedVStack className="gap-4">
          <AskDetailsCardSkeleton />
          <AskEventsSkeleton />
          <AskPullPositionsContainerSkeleton />
          <PosesByArtikulContainerSkeleton />
        </ThemedVStack>
      </ScrollView>
    </ThemedView>
  );
}
