import type { ArtDto } from "@/modules/arts/api/types/dto";
import { MapPin } from "lucide-react";

interface ArtZoneProps {
  artData: ArtDto;
}

export function ArtZone({ artData }: ArtZoneProps) {
  return (
    <p className="text-foreground flex items-center  text-nowrap">
      <MapPin size={12} className="text-orange-500" />
      {artData.zone}
    </p>
  );
}
