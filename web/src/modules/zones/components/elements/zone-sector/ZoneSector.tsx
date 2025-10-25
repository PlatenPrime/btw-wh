import type { ZoneDto } from "@/modules/zones/api/types";

interface ZoneSectorProps {
  zone: ZoneDto;
  className?: string;
}

export function ZoneSector({ zone, className }: ZoneSectorProps) {
  return <span className={className}>{zone.sector}</span>;
}
