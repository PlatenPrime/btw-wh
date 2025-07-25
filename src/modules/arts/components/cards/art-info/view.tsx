import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image";
import { BtradeArtInfoContainer } from "../btrade-art-info";

interface ArtInfoProps {
  artInfo: ArtDto; // Replace 'any' with the actual type of artInfo
}

export function ArtInfo({ artInfo }: ArtInfoProps) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <ArtDialogImage artikul={artInfo.artikul} />
        <div className="grid">
          <h2 className="mb-2 text-xl font-semibold">{artInfo.nameukr}</h2>

          <BtradeArtInfoContainer
            zone={artInfo.zone}
            artikul={artInfo.artikul}
          />
        </div>
      </div>
    </section>
  );
}
