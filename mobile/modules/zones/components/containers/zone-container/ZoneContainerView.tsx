import { ScrollView, RefreshControl } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import { ThemedVStack } from "@/components/themed";
import type { ZoneDto } from "@/modules/zones/api/types/dto";
import { ZoneDetailsCard } from "@/modules/zones/components/cards/zone-details-card/ZoneDetailsCard";
import { ArtsByZoneFetcher } from "@/modules/arts/components/fetchers/arts-by-zone-fetcher";
import {
  ArtsByZoneContainer,
  ArtsByZoneContainerSkeleton,
} from "@/modules/zones/components/containers/arts-by-zone-container";

interface ZoneContainerViewProps {
  zone: ZoneDto;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ZoneContainerView({
  zone,
  refreshing = false,
  onRefresh,
}: ZoneContainerViewProps) {
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
          <ZoneDetailsCard zone={zone} />
          <ArtsByZoneFetcher
            zone={zone.title}
            ContainerComponent={ArtsByZoneContainer}
            SkeletonComponent={ArtsByZoneContainerSkeleton}
          />
        </ThemedVStack>
      </ScrollView>
    </ThemedView>
  );
}

