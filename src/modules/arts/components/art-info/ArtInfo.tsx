import { MapPin } from "lucide-react";
import type { ArtDto } from "../../types/dto";

interface ArtInfoProps {
  artInfo: ArtDto; // Replace 'any' with the actual type of artInfo
}

export function ArtInfo({ artInfo }: ArtInfoProps) {


  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-xl font-semibold mb-2">{artInfo.nameukr}</h2>
        <p className="flex items-center gap-1 text-muted-foreground" > <MapPin /> {artInfo.zone}</p>
    </section>
  );
}
