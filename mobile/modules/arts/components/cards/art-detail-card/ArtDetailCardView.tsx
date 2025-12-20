import { View } from "react-native";
import { ThemedView } from "@/components/themed-view";
import { useColorScheme } from "@/hooks/use-color-scheme";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtImageLink } from "@/modules/arts/components/elements/art-image-link/ArtImageLink";
import { ArtZone } from "@/modules/arts/components/elements/art-zone/ArtZone";
import { ArtLimit } from "@/modules/arts/components/elements/art-limit/ArtLimit";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";

interface ArtDetailCardViewProps {
  artData: ArtDto;
}

export function ArtDetailCardView({ artData }: ArtDetailCardViewProps) {
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";

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

