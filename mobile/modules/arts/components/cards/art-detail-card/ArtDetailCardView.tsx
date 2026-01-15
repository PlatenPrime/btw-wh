import { View } from "react-native";
import { ThemedView } from "@/components/themed/themed-view";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtImageLink } from "@/components/shared/art-image-link";
import { ArtZone } from "@/modules/arts/components/elements/art-zone/ArtZone";
import { ArtLimit } from "@/modules/arts/components/elements/art-limit/ArtLimit";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";

interface ArtDetailCardViewProps {
  artData: ArtDto;
}

export function ArtDetailCardView({
  artData,
}: ArtDetailCardViewProps) {

  return (
    <ThemedView
      className="p-3 rounded-lg border bg-background-0 border-outline-50  "
    >
      <View className="gap-3">
        <ArtImageLink artikul={artData.artikul} nameukr={artData.nameukr}  />

        <View className="gap-2">
          <ArtZone artData={artData} />
          <ArtLimit limit={artData.limit} />
          <BtradeArtDataFetcher artikul={artData.artikul} />
        </View>
      </View>
    </ThemedView>
  );
}

