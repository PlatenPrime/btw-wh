import { Card, CardContent } from "@/components/ui";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { BtradeArtDataContainer } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataContainer";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { ArtNameukr } from "@/modules/arts/components/elements/art-nameukr/ArtNameukr";
import { ArtZone } from "@/modules/arts/components/elements/art-zone/ArtZone";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import { ChevronsLeftRightEllipsis } from "lucide-react";

interface ArtDetailCardProps {
  artData: ArtDto;
}

export function ArtDetailCard({ artData }: ArtDetailCardProps) {
  return (
    <Card className="p-0">
      <CardContent className="flex items-start gap-2 p-1">
        <ArtDialogImage artikul={artData.artikul} />
        <div className="grid gap-1">
          <ArtNameukr nameukr={artData.nameukr} />
          <ArtZone artData={artData} />
          <BtradeArtDataFetcher
            artikul={artData.artikul}
            ContainerComponent={BtradeArtDataContainer}
            SkeletonComponent={BtradeArtDataSkeleton}
          />
          <ChevronsLeftRightEllipsis size={12} className="" />
          <div className="flex items-center gap-2">
            <CreateAskDialog preFilledArtikul={artData.artikul} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
