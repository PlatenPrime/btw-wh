import { View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtImageLink } from "@/modules/arts/components/elements/art-image-link/ArtImageLink";
import { ArtZone } from "@/modules/arts/components/elements/art-zone/ArtZone";
import { ArtLimit } from "@/modules/arts/components/elements/art-limit/ArtLimit";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";

interface ArtDetailCardViewProps {
  artData: ArtDto;
  bgColor: string;
  borderColor: string;
}

export function ArtDetailCardView({
  artData,
  bgColor,
  borderColor,
}: ArtDetailCardViewProps) {

  return (
    <ThemedView
      className="p-3 rounded-lg border"
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
      }}
    >
      <View className="gap-3">
        <ArtImageLink artikul={artData.artikul} nameukr={artData.nameukr} />

        <View className="gap-2">
          <ArtZone artData={artData} />
          <ArtLimit limit={artData.limit} />
          <BtradeArtDataFetcher artikul={artData.artikul} />
        </View>
      </View>
    </ThemedView>
  );
}

