import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDialogImage } from "../../dialogs/art-dialog-image/ArtDialogImage";
import { BtradeArtData } from "../../elements/btrade-art-data/BtradeArtData";
import { BtradeArtDataSkeleton } from "../../elements/btrade-art-data/BtradeArtDataSkeleton";
import { BtradeArtDataFetcher } from "../../fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import { PosesByArtikulContainer } from "../poses-by-artikul-container";

interface ArtContainerViewProps {
  artData: ArtDto;
}

export function ArtContainerView({ artData }: ArtContainerViewProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <ArtDialogImage artikul={artData.artikul} />
        <div className="grid">
          <h2 className="mb-2 text-xl font-semibold">{artData.nameukr}</h2>
          <BtradeArtDataFetcher
            artikul={artData.artikul}
            ContainerComponent={BtradeArtData}
            SkeletonComponent={BtradeArtDataSkeleton}
          />
        </div>
      </div>

      {/* Позиции по артикулу */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Позиції на складах</h3>
        <PosesByArtikulContainer artikul={artData.artikul} />
      </div>
    </section>
  );
}
