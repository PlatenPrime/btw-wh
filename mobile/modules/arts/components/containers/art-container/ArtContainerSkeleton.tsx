import { ScrollView } from "@/components/ui";
import { ArtDetailCardSkeleton } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCardSkeleton";
import { PosesByArtikulContainerSkeleton } from "@/modules/poses/components/containers/poses-by-artikul-container/PosesByArtikulContainerSkeleton";

export function ArtContainerSkeleton() {
  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
      <ArtDetailCardSkeleton />
      <PosesByArtikulContainerSkeleton />
    </ScrollView>
  );
}

