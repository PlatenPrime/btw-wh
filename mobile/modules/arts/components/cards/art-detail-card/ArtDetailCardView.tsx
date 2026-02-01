import { ArtImageLink } from "@/components/shared/art-image-link";
import { GlassCard } from "@/components/shared/glass-card";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtLimit } from "@/modules/arts/components/elements/art-limit/ArtLimit";
import { ArtZone } from "@/modules/arts/components/elements/art-zone/ArtZone";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import { View } from "react-native";

interface ArtDetailCardViewProps {
  artData: ArtDto;
}

export function ArtDetailCardView({ artData }: ArtDetailCardViewProps) {
  return (
    <GlassCard className="p-4">
      <View className="gap-3">
        <ArtImageLink artikul={artData.artikul} nameukr={artData.nameukr}  />

        <View className="gap-2">
          <ArtZone artData={artData} />
          <ArtLimit limit={artData.limit} />
          <BtradeArtDataFetcher artikul={artData.artikul} />
        </View>
      </View>
    </GlassCard>
  );
}

