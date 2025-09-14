import type { ArtDto } from "@/modules/arts/api/types/dto";
import { MapPin } from "lucide-react";
import { BtradeArtDataContainer } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataContainer";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";

interface ArtDetailCardProps {
  artData: ArtDto;
}

export function ArtDetailCard({ artData }: ArtDetailCardProps) {
  return (
    <div className="flex items-center gap-2">
      <ArtDialogImage artikul={artData.artikul} />
      <div className="grid">
        <h2 className="font-semibold">{artData.nameukr}</h2>
        <p className="text-muted-foreground flex items-center gap-1 text-xs text-nowrap">
          <MapPin size={12} className="text-orange-500" />
          {artData.zone}
        </p>
        <BtradeArtDataFetcher
          artikul={artData.artikul}
          ContainerComponent={BtradeArtDataContainer}
          SkeletonComponent={BtradeArtDataSkeleton}
        />
      </div>
    </div>
  );
}
