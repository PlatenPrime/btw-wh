import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { BtradeArtInfo } from "../../elements/btrade-art-info/BtradeArtInfo";

interface ArtInfoProps {
  artData: ArtDto;
}

export function ArtInfoView({ artData }: ArtInfoProps) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <ArtDialogImage artikul={artData.artikul} />
        <div className="grid">
          <h2 className="mb-2 text-xl font-semibold">{artData.nameukr}</h2>

          <BtradeArtInfo zone={artData.zone} artikul={artData.artikul} />
        </div>
      </div>
    </section>
  );
}
