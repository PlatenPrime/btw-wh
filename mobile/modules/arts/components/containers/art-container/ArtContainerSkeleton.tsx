import { ScrollView } from "react-native";
import { ArtDetailCardSkeleton } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCardSkeleton";
import { PosesByArtikulContainerSkeleton } from "@/modules/poses/components/containers/poses-by-artikul-container/PosesByArtikulContainerSkeleton";
import { AsksByArtikulContainerSkeleton } from "@/modules/asks/components/containers/asks-by-artikul-container/AsksByArtikulContainerSkeleton";

export function ArtContainerSkeleton() {
  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
      <ArtDetailCardSkeleton />
      <PosesByArtikulContainerSkeleton />
      <AsksByArtikulContainerSkeleton />
    </ScrollView>
  );
}

