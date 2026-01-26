import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCard } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCard";
import { ArtPosesByArtikulContainer } from "@/modules/arts/components/containers/poses-by-artikul-container/ArtPosesByArtikulContainer";
import { AsksByArtikulContainer } from "@/modules/asks/components/containers/asks-by-artikul-container/AsksByArtikulContainer";
import { AsksByArtikulContainerSkeleton } from "@/modules/asks/components/containers/asks-by-artikul-container/AsksByArtikulContainerSkeleton";
import { AsksByArtikulFetcher } from "@/modules/asks/components/fetchers/asks-by-artikul-fetcher/AsksByArtikulFetcher";
import { RefreshControl, ScrollView } from "react-native";

interface ArtContainerViewProps {
  artData: ArtDto;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ArtContainerView({
  artData,
  refreshing = false,
  onRefresh,
}: ArtContainerViewProps) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="p-4 gap-4"
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    >
      <ArtDetailCard artData={artData} />
      <ArtPosesByArtikulContainer artikul={artData.artikul} />
      <AsksByArtikulFetcher
        artikul={artData.artikul}
        ContainerComponent={AsksByArtikulContainer}
        SkeletonComponent={AsksByArtikulContainerSkeleton}
      />
    </ScrollView>
  );
}
