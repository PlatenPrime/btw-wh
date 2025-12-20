import { View, ScrollView } from "react-native";
import { ArtDetailCardSkeleton } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCardSkeleton";

export function ArtContainerSkeleton() {
  return (
    <ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
      <ArtDetailCardSkeleton />
    </ScrollView>
  );
}

