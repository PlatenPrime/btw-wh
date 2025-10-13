import type { ArtDto } from "@/modules/arts/api/types/dto";
import { MapPin } from "lucide-react";

interface ArtZoneProps {
  artData: ArtDto;
}

export function ArtZone({ artData }: ArtZoneProps) {
  return (
    <p className="text-foreground flex items-center gap-2 text-xs text-nowrap">
      <MapPin className="h-4 w-4 text-orange-500" />
      <span>{artData.zone}</span>
    </p>
  );
}
