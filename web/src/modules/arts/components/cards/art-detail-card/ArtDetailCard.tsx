import { Card, CardContent } from "@/components/ui";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { BtradeArtDataContainer } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataContainer";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { ArtNameukr } from "@/modules/arts/components/elements/art-nameukr/ArtNameukr";
import { ArtZone } from "@/modules/arts/components/elements/art-zone/ArtZone";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import { ArtLimit } from "../../elements/art-limit/ArtLimit";

interface ArtDetailCardProps {
  artData: ArtDto;
}

export function ArtDetailCard({ artData }: ArtDetailCardProps) {
  return (
    <Card className="p-0">
      <CardContent className="flex items-start gap-2 p-2 text-sm">
        <ArtDialogImage artikul={artData.artikul} />

        <div className="grid gap-2">
          <ArtNameukr nameukr={artData.nameukr} />
          <ArtZone artData={artData} />
          <ArtLimit limit={artData.limit} />
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
