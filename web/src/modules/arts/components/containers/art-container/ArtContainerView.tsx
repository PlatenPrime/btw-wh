import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDialogImage } from "../../dialogs/art-dialog-image/ArtDialogImage";
import { BtradeArtDataFetcher } from "../../fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";

interface ArtContainerViewProps {
  artData: ArtDto;
}

export function ArtContainerView({ artData }: ArtContainerViewProps) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <ArtDialogImage artikul={artData.artikul} />
        <div className="grid">
          <h2 className="mb-2 text-xl font-semibold">{artData.nameukr}</h2>
          <BtradeArtDataFetcher artikul={artData.artikul} zone={artData.zone} />
        </div>
      </div>
    </section>
  );
}
