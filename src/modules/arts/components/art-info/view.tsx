import { ArtDialogImage } from "@/modules/arts/components/art-dialog-image";
import type { ArtDto } from "@/modules/arts/types/dto";
import { BtradeArtInfoContainer } from "../btrade-art-info";

interface ArtInfoProps {
  artInfo: ArtDto; // Replace 'any' with the actual type of artInfo
}

export function ArtInfo({ artInfo }: ArtInfoProps) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-2 items-start">
        <ArtDialogImage artikul={artInfo.artikul}  />
        <div className="grid">
          <h2 className="text-xl font-semibold mb-2">{artInfo.nameukr}</h2>

          <BtradeArtInfoContainer
            zone={artInfo.zone}
            artikul={artInfo.artikul}
          />
        </div>
      </div>
    </section>
  );
}
