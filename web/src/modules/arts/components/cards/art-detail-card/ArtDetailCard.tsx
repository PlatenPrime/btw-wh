import { Card, CardContent } from "@/components/ui";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { BtradeArtDataContainer } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataContainer";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataSkeleton";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";
import { ChevronsLeftRightEllipsis, MapPin } from "lucide-react";

interface ArtDetailCardProps {
  artData: ArtDto;
}

export function ArtDetailCard({ artData }: ArtDetailCardProps) {
  return (
    <Card className="">
      <CardContent className="flex items-start gap-2">
        <ArtDialogImage artikul={artData.artikul} />
        <div className="grid gap-2">
          <h2 className="font-semibold">{artData.nameukr}</h2>
          <p className="text-foreground flex items-center gap-1 text-nowrap">
            <MapPin size={12} className="text-orange-500" />
            {artData.zone}
          </p>
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
