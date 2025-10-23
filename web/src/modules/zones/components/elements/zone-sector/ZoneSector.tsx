import { Badge } from "@/components/ui/badge";
import type { ZoneDto } from "@/modules/zones/api/types";

interface ZoneSectorProps {
  zone: ZoneDto;
  className?: string;
}

export function ZoneSector({ zone, className }: ZoneSectorProps) {
  const getVariant = () => {
    if (zone.sector === 0) return "secondary";
    if (zone.sector <= 3) return "default";
    if (zone.sector <= 6) return "outline";
    return "destructive";
  };

  return (
    <Badge variant={getVariant()} className={className}>
      Сектор {zone.sector}
    </Badge>
  );
}
