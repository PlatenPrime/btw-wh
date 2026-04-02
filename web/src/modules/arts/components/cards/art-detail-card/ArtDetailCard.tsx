import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { Card, CardContent } from "@/components/ui";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtProdPreview } from "@/modules/arts/components/elements/art-prod-preview";
import { BtradeArtDataContainer } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataContainer";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";
import { ArtZone } from "@/modules/arts/components/elements/art-zone/ArtZone";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import { ArtAbc } from "@/modules/arts/components/elements/art-abc/ArtAbc";
import { ArtLimit } from "../../elements/art-limit/ArtLimit";

interface ArtDetailCardProps {
  artData: ArtDto;
}

export function ArtDetailCard({ artData }: ArtDetailCardProps) {
  return (
    <Card className="p-0">
      <CardContent className="grid gap-2 p-2 text-sm">
        <ArtikulImageLink
          artikul={artData.artikul}
          nameukr={artData.nameukr}
          target="_self"
          link="#"
        />

        <ArtProdPreview
          art={artData}
          imageSize="md"
          className="text-sm"
          fallbackKeyClassName="text-muted-foreground text-sm"
        />

        <div className="grid gap-2">
          <ArtZone artData={artData} />
          <ArtLimit limit={artData.limit} />
          <ArtAbc abc={artData.abc} />
          <BtradeArtDataFetcher
            artikul={artData.artikul}
            ContainerComponent={BtradeArtDataContainer}
            SkeletonComponent={BtradeArtDataSkeleton}
          />
        </div>
      </CardContent>
    </Card>
  );
}
