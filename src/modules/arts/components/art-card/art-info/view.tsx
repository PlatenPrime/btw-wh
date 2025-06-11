import { MapPin } from "lucide-react";
import type { ArtDto } from "@/modules/arts/types/dto";
import { ArtDialogImage } from "@/modules/arts/components/art-dialog-image";

interface ArtInfoProps {
  artInfo: ArtDto; // Replace 'any' with the actual type of artInfo
}

export function ArtInfo({ artInfo }: ArtInfoProps) {
  return (
    <section className="flex flex-col gap-2">
      <div className="flex gap-2">
        <ArtDialogImage artikul={artInfo.artikul} />
        <h2 className="text-xl font-semibold mb-2">{artInfo.nameukr}</h2>
      </div>

      <p className="flex items-center gap-1 text-muted-foreground">
        {" "}
        <MapPin className="text-orange-500" /> {artInfo.zone}
      </p>
    </section>
  );
}
